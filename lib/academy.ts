import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Could not load the signed-in user: ${error.message}`);
  }

  return { supabase, user };
}

export async function isEnrolled(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enrollments")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not check course access: ${error.message}`);
  }

  return Boolean(data);
}
