// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "HISAIZU CREATORS BANK",
  description: "HISAIZU ART PROJECT / Creators & Vendors Bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">
              {children}
            </div>
          </main>

          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-5xl px-4 py-3 text-xs text-slate-500 flex flex-col gap-1 md:flex-row md:justify-between">
              <span>© {new Date().getFullYear()} HISAIZU ART PROJECT</span>
              <span>久伊豆神社 発・クリエイター母艦</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}