import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import LearnerNav from "@/components/learner-nav";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { reviewPayment } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="learner-page">
        <div className="setup-notice">
          <strong>Chưa cấu hình dịch vụ tài khoản</strong>
          <p>Thêm cấu hình Supabase và ADMIN_EMAIL vào .env.local để duyệt thanh toán.</p>
        </div>
      </main>
    );
  }

  const authClient = await createClient();
  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user) {
    redirect("/login?next=%2Fadmin");
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    return (
      <main className="learner-page">
        <div className="setup-notice">
          <strong>Thiếu email quản trị</strong>
          <p>Đặt ADMIN_EMAIL trong .env.local để giới hạn quyền duyệt thanh toán.</p>
        </div>
      </main>
    );
  }
  if (user.email?.toLowerCase() !== adminEmail) {
    notFound();
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return (
      <>
        <LearnerNav email={user.email} />
        <main className="learner-page">
          <div className="setup-notice">
            <strong>Thiếu khóa quản trị Supabase</strong>
            <p>
              Điền SUPABASE_SERVICE_ROLE_KEY phía máy chủ trong .env.local.
              Không chia sẻ khóa này cho người học.
            </p>
          </div>
        </main>
      </>
    );
  }

  const admin = createAdminClient();
  const { data: requests, error } = await admin
    .from("payment_requests")
    .select("id, email, transfer_reference, created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Không tải được yêu cầu thanh toán: ${error.message}`);
  }

  return (
    <>
      <LearnerNav email={user.email} />
      <main className="learner-page admin-page">
        <p className="eyebrow"><span className="eyebrow-dot" /> QUẢN TRỊ KHÓA HỌC</p>
        <h1>Duyệt chuyển khoản.</h1>
        <p className="learner-lead">
          Đối chiếu giao dịch trong tài khoản ngân hàng trước khi kích hoạt quyền học.
        </p>
        <div className="admin-requests">
          {requests.length ? requests.map((item) => (
            <article className="admin-request" key={item.id}>
              <div>
                <span className="request-date">
                  {new Intl.DateTimeFormat("vi-VN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                    timeZone: "Asia/Ho_Chi_Minh",
                  }).format(new Date(item.created_at))}
                </span>
                <h2>{item.email}</h2>
                <p>Mã giao dịch: <strong>{item.transfer_reference}</strong></p>
              </div>
              <div className="request-actions">
                <form action={reviewPayment}>
                  <input name="requestId" type="hidden" value={item.id} />
                  <input name="decision" type="hidden" value="reject" />
                  <button className="button button-outline" type="submit">Từ chối</button>
                </form>
                <form action={reviewPayment}>
                  <input name="requestId" type="hidden" value={item.id} />
                  <input name="decision" type="hidden" value="approve" />
                  <button className="button button-orange" type="submit">Xác nhận & kích hoạt</button>
                </form>
              </div>
            </article>
          )) : (
            <section className="empty-requests">
              <span aria-hidden="true">✓</span>
              <h2>Không có yêu cầu đang chờ.</h2>
              <p>Các yêu cầu thanh toán mới sẽ hiển thị tại đây.</p>
              <Link className="text-link" href="/learn">Về trang học tập <span>↗</span></Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
