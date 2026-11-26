import Link from "next/link";
import { signOut } from "@/app/auth/actions";

type LearnerNavProps = {
  email?: string;
};

export default function LearnerNav({ email }: LearnerNavProps) {
  return (
    <header className="learner-nav">
      <Link className="brand learner-brand" href="/learn">
        <span className="brand-mark" aria-hidden="true">お</span>
        <span className="brand-name">omotenashi<span>academy</span></span>
      </Link>
      <nav aria-label="Điều hướng học tập">
        <Link href="/learn">Lộ trình của tôi</Link>
        <Link href="/">Trang giới thiệu</Link>
      </nav>
      <div className="learner-user">
        {email && <span title={email}>{email}</span>}
        <form action={signOut}>
          <button type="submit">Đăng xuất</button>
        </form>
      </div>
    </header>
  );
}
