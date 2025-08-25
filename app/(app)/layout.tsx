import "./../globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], weight:["400","500","600","700","800"], variable:"--font-inter" });
export const metadata: Metadata = { title: "AI Workbench", description: "PoC" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh bg-paper text-ink">
        <div className="mx-auto max-w-[1100px] px-6 py-8">{children}</div>
      </body>
    </html>
  );
}
