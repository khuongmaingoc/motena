import Link from "next/link";
import AuthForm from "@/components/auth-form";
import { isSupabaseConfigured } from "@/lib/supabase/config";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <main className="account-page">
      <div className="account-decoration" aria-hidden="true">
        <span>心</span>
      </div>
      <AuthForm
        configured={isSupabaseConfigured()}
        mode="login"
        nextPath={next}
      />
      <Link className="account-home-link" href="/">Trang chủ</Link>
    </main>
  );
}
