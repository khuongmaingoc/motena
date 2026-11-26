"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(`Could not sign out: ${error.message}`);
    }
  }

  redirect("/login");
}
