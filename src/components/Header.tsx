"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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

          {/* PCナビ */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-slate-600">HOME</a>
            <a href="/creators" className="hover:text-slate-600">CREATORS</a>
            <a href="/vendors" className="hover:text-slate-600">VENDORS</a>
            <a href="/projects" className="hover:text-slate-600">PROJECTS</a>
            <a href="/about" className="hover:text-slate-600">ABOUT</a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/hisaizu_artproject/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate-500 hover:text-slate-900"
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

            <a
              href="/register"
              className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-800"
            >
              BANKに登録
            </a>
          </nav>

          {/* モバイルメニュー */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {/* モバイルメニュー展開 */}
        {menuOpen && (
          <div className="md:hidden border-t px-4 py-6 bg-white">
            <nav className="flex flex-col gap-4 text-sm">
              <a href="/">HOME</a>
              <a href="/creators">CREATORS</a>
              <a href="/vendors">VENDORS</a>
              <a href="/projects">PROJECTS</a>
              <a href="/about">ABOUT</a>
            </nav>
          </div>
        )}
      </header>

      {/* ✅ モバイル固定CTA */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <a
          href="/register"
          className="flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
        >
          BANKに登録する
        </a>
      </div>
    </>
  );
}