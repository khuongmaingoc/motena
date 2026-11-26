"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

type AuthFormProps = {
  mode: "login" | "register";
  nextPath?: string;
  configured: boolean;
};

function safeNextPath(value: string | undefined) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/learn";
}

export default function AuthForm({
  mode,
  nextPath,
  configured,
}: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRegister = mode === "register";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (isRegister) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { full_name: name.trim() },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) {
          setErrorMessage(error.message);
        } else if (!data.session) {
          setMessage("Tài khoản đã được tạo. Hãy kiểm tra email để xác nhận trước khi đăng nhập.");
        } else {
          router.push("/learn");
          router.refresh();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage("Email hoặc mật khẩu chưa chính xác.");
        } else {
          router.push(safeNextPath(nextPath));
          router.refresh();
        }
      }
    } catch {
      setErrorMessage("Chưa kết nối được dịch vụ tài khoản. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-card">
      <Link className="academy-back-link" href="/">
        <span aria-hidden="true">←</span> Omotenashi Academy
      </Link>
      <p className="eyebrow"><span className="eyebrow-dot" /> HÀNH TRÌNH 21 NGÀY</p>
      <h1>{isRegister ? "Bắt đầu hành trình." : "Chào mừng bạn trở lại."}</h1>
      <p className="auth-lead">
        {isRegister
          ? "Tạo tài khoản để đăng ký chương trình và theo dõi quá trình học."
          : "Đăng nhập để tiếp tục hành trình học Omotenashi của bạn."}
      </p>

      {!configured ? (
        <div className="setup-notice" role="status">
          <strong>Chưa kết nối Supabase</strong>
          <p>
            Tạo dự án Supabase, điền các khóa trong <code>.env.local</code> theo
            mẫu <code>.env.example</code>, rồi chạy migration trong thư mục{" "}
            <code>supabase/migrations</code>.
          </p>
        </div>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Họ và tên
              <input
                autoComplete="name"
                maxLength={100}
                onChange={(event) => setName(event.target.value)}
                placeholder="Tên của bạn"
                required
                value={name}
              />
            </label>
          )}
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ban@email.com"
              required
              type="email"
              value={email}
            />
          </label>
          <label>
            Mật khẩu
            <input
              autoComplete={isRegister ? "new-password" : "current-password"}
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={isRegister ? "Ít nhất 8 ký tự" : "Nhập mật khẩu"}
              required
              type="password"
              value={password}
            />
          </label>
          {errorMessage && <p className="form-message form-error" role="alert">{errorMessage}</p>}
          {message && <p className="form-message form-success" role="status">{message}</p>}
          <button className="button button-orange auth-submit" disabled={isSubmitting} type="submit">
            {isSubmitting
              ? "Đang xử lý..."
              : isRegister
                ? "Tạo tài khoản"
                : "Đăng nhập"}
            <span aria-hidden="true">↗</span>
          </button>
        </form>
      )}

      <p className="auth-switch">
        {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
        <Link href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Đăng nhập" : "Tạo tài khoản"}
        </Link>
      </p>
    </div>
  );
}
