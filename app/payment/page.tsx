import Link from "next/link";
import { redirect } from "next/navigation";
import LearnerNav from "@/components/learner-nav";
import PaymentCopy from "@/components/payment-copy";
import SetupState from "@/components/setup-state";
import PaymentForm from "./payment-form";
import { getCurrentUser } from "@/lib/academy";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

function formatPrice(value: string | undefined) {
  if (!value || !/^\d+$/.test(value)) {
    return null;
  }

  return new Intl.NumberFormat("vi-VN").format(Number(value));
}

export default async function PaymentPage() {
  if (!isSupabaseConfigured()) {
    return <SetupState />;
  }

  const { supabase, user } = await getCurrentUser();
  if (!user) {
    redirect("/login?next=%2Fpayment");
  }

  const [{ data: enrollment, error: enrollmentError }, { data: pendingRequest, error: requestError }] =
    await Promise.all([
      supabase
        .from("enrollments")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("payment_requests")
        .select("id, created_at, transfer_reference")
        .eq("user_id", user.id)
        .eq("status", "pending")
        .maybeSingle(),
    ]);

  if (enrollmentError || requestError) {
    throw new Error("Không thể tải thông tin thanh toán. Vui lòng thử lại.");
  }

  if (enrollment) {
    redirect("/learn");
  }

  const price = formatPrice(process.env.COURSE_PRICE);
  const bankName = process.env.BANK_NAME;
  const bankAccount = process.env.BANK_ACCOUNT;
  const accountName = process.env.BANK_ACCOUNT_NAME;
  const bankConfigured = Boolean(bankName && bankAccount && accountName && price);
  const transferContent = `OT21 ${user.email}`;

  return (
    <>
      <LearnerNav email={user.email} />
      <main className="learner-page payment-page">
        <Link className="back-link" href="/learn">← Quay lại lộ trình</Link>
        <div className="payment-heading">
          <p className="eyebrow"><span className="eyebrow-dot" /> XÁC NHẬN THANH TOÁN</p>
          <h1>Kích hoạt hành trình của bạn.</h1>
          <p>
            Quyền học được mở sau khi đội ngũ xác nhận giao dịch chuyển khoản
            vào tài khoản ngân hàng.
          </p>
        </div>

        {pendingRequest ? (
          <section className="payment-pending">
            <span aria-hidden="true">◷</span>
            <div>
              <h2>Yêu cầu đang chờ xác nhận</h2>
              <p>
                Hệ thống đã nhận thông tin giao dịch. Bạn có thể quay lại lộ
                trình; video sẽ mở khi thanh toán được xác nhận.
              </p>
              <dl className="pending-details">
                <div>
                  <dt>Mã giao dịch</dt>
                  <dd>{pendingRequest.transfer_reference}</dd>
                </div>
                <div>
                  <dt>Gửi lúc</dt>
                  <dd>
                    {new Intl.DateTimeFormat("vi-VN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Asia/Ho_Chi_Minh",
                    }).format(new Date(pendingRequest.created_at))}
                  </dd>
                </div>
              </dl>
              <Link className="text-link" href="/learn">Về lộ trình của tôi <span>↗</span></Link>
            </div>
          </section>
        ) : (
          <div className="payment-layout">
            <section className="bank-card">
              <div className="bank-card-heading">
                <div>
                  <span>CHUYỂN KHOẢN NGÂN HÀNG</span>
                  <h2>Thông tin thanh toán</h2>
                </div>
                <span className="bank-symbol" aria-hidden="true">一</span>
              </div>
              {bankConfigured ? (
                <dl className="bank-details">
                  <div><dt>Ngân hàng</dt><dd>{bankName}</dd></div>
                  <div><dt>Số tài khoản</dt><dd><PaymentCopy label="số tài khoản" value={bankAccount ?? ""} /></dd></div>
                  <div><dt>Chủ tài khoản</dt><dd>{accountName}</dd></div>
                  <div><dt>Số tiền</dt><dd><PaymentCopy label="số tiền" value={`${price} ₫`} /></dd></div>
                  <div><dt>Nội dung</dt><dd><PaymentCopy label="nội dung chuyển khoản" value={transferContent} /></dd></div>
                </dl>
              ) : (
                <div className="setup-notice">
                  <strong>Chưa cấu hình tài khoản nhận tiền</strong>
                  <p>
                    Chủ khóa học cần điền <code>BANK_NAME</code>,{" "}
                    <code>BANK_ACCOUNT</code>, <code>BANK_ACCOUNT_NAME</code>{" "}
                    và <code>COURSE_PRICE</code> trong <code>.env.local</code>.
                  </p>
                </div>
              )}
              <p className="bank-security-note">
                Chỉ gửi thông tin giao dịch sau khi đã chuyển khoản. Không gửi
                mật khẩu hoặc thông tin thẻ ngân hàng.
              </p>
            </section>

            <section className="payment-confirm-card">
              <p className="eyebrow"><span className="eyebrow-dot" /> SAU KHI CHUYỂN KHOẢN</p>
              <h2>Gửi thông tin để đối chiếu.</h2>
              <ol>
                <li>Chuyển đúng số tiền và ghi nội dung có email đăng ký.</li>
                <li>Nhập mã giao dịch hoặc nội dung chuyển khoản bên dưới.</li>
                <li>Đội ngũ xác nhận và kích hoạt tài khoản học.</li>
              </ol>
              {bankConfigured ? (
                <PaymentForm transferContent={transferContent} />
              ) : (
                <p className="input-hint">
                  Biểu mẫu gửi yêu cầu sẽ mở sau khi chủ khóa học cấu hình thông
                  tin nhận tiền.
                </p>
              )}
            </section>
          </div>
        )}
      </main>
    </>
  );
}
