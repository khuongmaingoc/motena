"use client";

import { useState } from "react";

type PaymentCopyProps = {
  label: string;
  value: string;
};

export default function PaymentCopy({ label, value }: PaymentCopyProps) {
  const [copied, setCopied] = useState(false);

  async function copyValue() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="copy-value"
      type="button"
      onClick={copyValue}
      title={`Sao chép ${label}`}
      aria-label={`Sao chép ${label}`}
    >
      <span>{value}</span>
      <small aria-live="polite">{copied ? "Đã sao chép" : "Sao chép"}</small>
    </button>
  );
}
