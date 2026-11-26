import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Omotenashi Academy — 21 ngày phục vụ từ tâm",
  description:
    "Học 15 phút mỗi ngày, rèn luyện tinh thần Omotenashi và tạo trải nghiệm khách hàng tốt hơn qua 21 ngày thực hành.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cormorant.variable}>{children}</body>
    </html>
  );
}
