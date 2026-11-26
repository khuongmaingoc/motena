import Link from "next/link";
import AuthForm from "@/components/auth-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <main className="account-page">
      <div className="account-decoration" aria-hidden="true">
        <span>一</span>
      </div>
      <AuthForm configured={isSupabaseConfigured()} mode="register" />
      <Link className="account-home-link" href="/">Trang chủ</Link>
    </main>
  );
}
