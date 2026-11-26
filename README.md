# Omotenashi Academy

Landing page and 21-day learning experience built with Next.js 15, React 19,
Tailwind CSS 4, and Supabase.

## Run locally

1. Install dependencies with `npm install`.
2. Create a Supabase project.
3. Copy `.env.example` to `.env.local` and set the Supabase URL, anon key,
   server-only service role key, admin email, bank details, and course price.
   Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser or commit `.env.local`.
4. Run `supabase/migrations/202611170001_course_access.sql` in the Supabase SQL
   Editor.
5. In Supabase Auth settings, set the site URL and add
   `http://localhost:3000/auth/callback` to the allowed redirect URLs.
6. Run `npm run dev` and open <http://localhost:3000>.

Email/password accounts must confirm their email before submitting a payment
request. Configure Supabase email delivery and the production callback URL when
deploying.

## Manual bank-transfer activation

Learners sign in, transfer to the configured bank account, and submit the
transfer reference. After checking the bank statement, sign in with the address
in `ADMIN_EMAIL` and open `/admin` to approve or reject the request. Approval
and course activation happen in one database transaction. The service role key
is used only by the server-side admin flow.

## Add lesson videos

Set `videoUrl` on the relevant lesson in `data/lessons.ts`. YouTube and Vimeo
links are embedded in the lesson player; direct `.mp4`, `.webm`, and `.ogg`
links use the native player. Other URLs are shown as external links. Lesson
pages and video URLs are only rendered after server-side enrollment checks.
