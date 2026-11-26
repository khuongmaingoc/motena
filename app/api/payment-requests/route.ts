import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/academy";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Dịch vụ tài khoản chưa được cấu hình." },
      { status: 503 },
    );
  }

  let body: { transferReference?: unknown };
  try {
    body = (await request.json()) as { transferReference?: unknown };
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const transferReference =
    typeof body.transferReference === "string" ? body.transferReference.trim() : "";
  if (transferReference.length < 4 || transferReference.length > 120) {
    return NextResponse.json(
      { error: "Mã giao dịch cần có từ 4 đến 120 ký tự." },
      { status: 400 },
    );
  }

  const { supabase, user } = await getCurrentUser();
  if (!user || !user.email || !user.email_confirmed_at) {
    return NextResponse.json(
      { error: "Hãy đăng nhập bằng email đã xác nhận trước khi gửi yêu cầu." },
      { status: 401 },
    );
  }

  const { data: enrollment, error: enrollmentError } = await supabase
    .from("enrollments")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (enrollmentError) {
    console.error("Could not check enrollment before payment request", enrollmentError);
    return NextResponse.json({ error: "Chưa kiểm tra được trạng thái khóa học." }, { status: 500 });
  }
  if (enrollment) {
    return NextResponse.json({ error: "Khóa học đã được kích hoạt cho tài khoản này." }, { status: 409 });
  }

  const { data: pending, error: pendingError } = await supabase
    .from("payment_requests")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "pending")
    .maybeSingle();
  if (pendingError) {
    console.error("Could not check pending payment request", pendingError);
    return NextResponse.json({ error: "Chưa kiểm tra được yêu cầu thanh toán." }, { status: 500 });
  }
  if (pending) {
    return NextResponse.json({ error: "Yêu cầu thanh toán của bạn đang chờ xác nhận." }, { status: 409 });
  }

  const { error: insertError } = await supabase.from("payment_requests").insert({
    user_id: user.id,
    email: user.email,
    transfer_reference: transferReference,
    status: "pending",
  });
  if (insertError) {
    console.error("Could not create payment request", insertError);
    if (insertError.code === "23505") {
      return NextResponse.json(
        { error: "Yêu cầu thanh toán của bạn đang chờ xác nhận." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Chưa gửi được yêu cầu thanh toán." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
