"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (error || !user?.email || !adminEmail || user.email.toLowerCase() !== adminEmail) {
    redirect("/learn");
  }

  return user.email;
}

export async function reviewPayment(formData: FormData) {
  const reviewerEmail = await requireAdmin();
  const requestId = formData.get("requestId");
  const decision = formData.get("decision");

  if (
    typeof requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId) ||
    (decision !== "approve" && decision !== "reject")
  ) {
    throw new Error("Yêu cầu xác nhận thanh toán không hợp lệ.");
  }

  const admin = createAdminClient();
  if (decision === "approve") {
    const { data, error } = await admin.rpc("approve_payment_request", {
      p_request_id: requestId,
      p_reviewer_email: reviewerEmail,
    });
    if (error || !data) {
      throw new Error(`Không thể kích hoạt khóa học: ${error?.message ?? "Yêu cầu không còn chờ xử lý."}`);
    }
  } else {
    const { data, error } = await admin
      .from("payment_requests")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: reviewerEmail,
      })
      .eq("id", requestId)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();

    if (error || !data) {
      throw new Error(`Không thể từ chối yêu cầu: ${error?.message ?? "Yêu cầu không còn chờ xử lý."}`);
    }
  }

  revalidatePath("/admin");
  revalidatePath("/learn");
  redirect("/admin");
}
