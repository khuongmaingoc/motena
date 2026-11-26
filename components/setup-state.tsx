import Link from "next/link";
import LearnerNav from "@/components/learner-nav";

export default function SetupState() {
  return (
    <>
      <LearnerNav />
      <main className="learner-page">
        <section className="setup-notice setup-notice-large">
          <p className="eyebrow"><span className="eyebrow-dot" /> CẦN CẤU HÌNH</p>
          <h1>Kết nối tài khoản học tập.</h1>
          <p>
            Tạo dự án Supabase, cấu hình các biến môi trường trong{" "}
            <code>.env.local</code>, sau đó chạy migration trong{" "}
            <code>supabase/migrations</code>. Hướng dẫn cấu hình nằm trong
            README.
          </p>
          <Link className="text-link" href="/">Quay về trang chủ <span>↗</span></Link>
        </section>
      </main>
    </>
  );
}
