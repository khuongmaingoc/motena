create table if not exists public.payment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  email text not null,
  transfer_reference text not null check (
    char_length(transfer_reference) between 4 and 120
  ),
  status text not null default 'pending' check (
    status in ('pending', 'approved', 'rejected')
  ),
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by text
);

create unique index if not exists payment_requests_one_pending_per_user
  on public.payment_requests (user_id)
  where status = 'pending';

create table if not exists public.enrollments (
  user_id uuid primary key references auth.users (id) on delete cascade,
  payment_request_id uuid not null unique
    references public.payment_requests (id),
  activated_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  day smallint not null check (day between 1 and 21),
  completed_at timestamptz not null default now(),
  primary key (user_id, day)
);

alter table public.payment_requests enable row level security;
alter table public.enrollments enable row level security;
alter table public.lesson_progress enable row level security;

drop policy if exists "Users read own payment requests"
  on public.payment_requests;
create policy "Users read own payment requests"
  on public.payment_requests for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users submit own pending payment request"
  on public.payment_requests;
create policy "Users submit own pending payment request"
  on public.payment_requests for insert to authenticated
  with check (
    auth.uid() = user_id
    and email = (auth.jwt() ->> 'email')
    and status = 'pending'
  );

drop policy if exists "Users read own enrollment"
  on public.enrollments;
create policy "Users read own enrollment"
  on public.enrollments for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Enrolled users read own lesson progress"
  on public.lesson_progress;
create policy "Enrolled users read own lesson progress"
  on public.lesson_progress for select to authenticated
  using (
    auth.uid() = user_id
    and exists (
      select 1 from public.enrollments
      where enrollments.user_id = auth.uid()
    )
  );

drop policy if exists "Enrolled users save own lesson progress"
  on public.lesson_progress;
create policy "Enrolled users save own lesson progress"
  on public.lesson_progress for insert to authenticated
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.enrollments
      where enrollments.user_id = auth.uid()
    )
  );

grant select, insert on public.payment_requests to authenticated;
grant select on public.enrollments to authenticated;
grant select, insert on public.lesson_progress to authenticated;

create or replace function public.approve_payment_request(
  p_request_id uuid,
  p_reviewer_email text
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  approved_user_id uuid;
begin
  update public.payment_requests
  set status = 'approved',
      reviewed_at = now(),
      reviewed_by = p_reviewer_email
  where id = p_request_id
    and status = 'pending'
  returning user_id into approved_user_id;

  if approved_user_id is null then
    return false;
  end if;

  insert into public.enrollments (user_id, payment_request_id)
  values (approved_user_id, p_request_id);

  return true;
end;
$$;

revoke all on function public.approve_payment_request(uuid, text)
  from public, anon, authenticated;
grant execute on function public.approve_payment_request(uuid, text)
  to service_role;
