"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PaymentFormProps = {
  transferContent: string;
};

export default function PaymentForm({ transferContent }: PaymentFormProps) {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyTransferContent() {
    try {
      await navigator.clipboard.writeText(transferContent);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/payment-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ transferReference: reference.trim() }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(result.error ?? "Chưa gửi được yêu cầu. Vui lòng thử lại.");
      } else {
        setMessage("Đã gửi thông tin. Đội ngũ sẽ đối chiếu giao dịch và kích hoạt khóa học sau khi xác nhận.");
        setReference("");
        router.refresh();
      }
    } catch {
      setErrorMessage("Không kết nối được máy chủ. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="payment-form" onSubmit={handleSubmit}>
      <label htmlFor="transfer-reference">Mã giao dịch hoặc nội dung chuyển khoản</label>
      <button
        className="transfer-content-copy"
        type="button"
        onClick={copyTransferContent}
        aria-label="Sao chép nội dung chuyển khoản"
      >
        <span>{transferContent}</span>
        <small aria-live="polite">{copied ? "Đã sao chép" : "Sao chép"}</small>
      </button>
      <input
        autoComplete="off"
        id="transfer-reference"
        maxLength={120}
        minLength={4}
        onChange={(event) => setReference(event.target.value)}
        placeholder="Ví dụ: OT21 nguyenvana@email.com"
        required
        value={reference}
      />
      <p className="input-hint">
        Hãy ghi email đăng ký vào nội dung chuyển khoản để đối chiếu nhanh hơn.
      </p>
      {errorMessage && <p className="form-message form-error" role="alert">{errorMessage}</p>}
      {message && <p className="form-message form-success" role="status">{message}</p>}
      <button
        className="button button-orange"
        disabled={isSubmitting || reference.trim().length < 4}
        type="submit"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Đang gửi..." : "Tôi đã chuyển khoản"}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
