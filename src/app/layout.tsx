// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

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
          {/* ヘッダー */}
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
              {/* ロゴ */}
              <a href="/" className="flex items-baseline gap-2">
                <span className="text-xs tracking-widest text-slate-500">
                  HISAIZU
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  CREATORS BANK
                </span>
              </a>

              {/* グローバルナビ */}
              <nav className="flex items-center gap-6 text-sm">
                <a href="/" className="hover:text-slate-600">
                  HOME
                </a>
                <a href="/creators" className="hover:text-slate-600">
                  CREATORS
                </a>
                <a href="/vendors" className="hover:text-slate-600">
                  VENDORS
                </a>
                <a href="/projects" className="hover:text-slate-600">
                  PROJECTS
                </a>
                <a href="/about" className="hover:text-slate-600">
                  ABOUT
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/hisaizu_artproject/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-slate-900 transition"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm9.5 2a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
                  </svg>
                </a>

                {/* 登録 */}
                <a
                  href="/register"
                  className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  BANKに登録
                </a>
              </nav>
            </div>
          </header>

          {/* メイン */}
          <main className="flex-1">
            <div className="mx-auto max-w-5xl px-4 py-10">
              {children}
            </div>
          </main>

          {/* フッター */}
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} HISAIZU ART PROJECT</span>
              <span>久伊豆神社 発・クリエイター母艦</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}