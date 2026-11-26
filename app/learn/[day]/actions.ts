"use server";

import { redirect } from "next/navigation";
import { isEnrolled } from "@/lib/academy";
import { getCurrentUser } from "@/lib/academy";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function completeLesson(formData: FormData) {
  const day = Number(formData.get("day"));
  if (!Number.isInteger(day) || day < 1 || day > 21) {
    throw new Error("Ngày học không hợp lệ.");
  }
  if (!isSupabaseConfigured()) {
    throw new Error("Dịch vụ tài khoản chưa được cấu hình.");
  }

  const { supabase, user } = await getCurrentUser();
  if (!user || !(await isEnrolled(user.id))) {
    redirect("/learn");
  }

  const { data: existing, error: existingError } = await supabase
    .from("lesson_progress")
    .select("day")
    .eq("user_id", user.id)
    .eq("day", day)
    .maybeSingle();

  if (existingError) {
    throw new Error("Không thể kiểm tra tiến độ bài học.");
  }

  if (!existing) {
    const { error } = await supabase.from("lesson_progress").insert({
      user_id: user.id,
      day,
    });
    if (error) {
      throw new Error(`Không thể lưu tiến độ bài học: ${error.message}`);
    }
  }

  redirect(`/learn/${day}?completed=1`);
}
