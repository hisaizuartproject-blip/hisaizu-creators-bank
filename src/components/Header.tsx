"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 py-3">
          {/* ロゴ */}
          <Link href="/" className="flex items-baseline gap-2">
            <span className="text-xs tracking-widest text-slate-500">
              HISAIZU
            </span>
            <span className="text-sm font-semibold text-slate-800">
              CREATORS BANK
            </span>
          </Link>

          {/* PCナビ */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/">HOME</Link>
            <Link href="/creators">CREATORS</Link>
            <Link href="/vendors">VENDORS</Link>
            <Link href="/projects">PROJECTS</Link>
            <Link href="/about">ABOUT</Link>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/hisaizu_artproject/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5 text-slate-600 hover:text-slate-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
              </svg>
            </a>

            <Link
              href="/register"
              className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
            >
              BANKに登録
            </Link>
          </nav>

          {/* モバイル：ハンバーガー */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setOpen(!open)}
            aria-label="menu"
          >
            ☰
          </button>
        </div>

        {/* モバイルメニュー */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="flex flex-col px-4 py-4 gap-4 text-sm">
              <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
              <Link href="/creators" onClick={() => setOpen(false)}>CREATORS</Link>
              <Link href="/vendors" onClick={() => setOpen(false)}>VENDORS</Link>
              <Link href="/projects" onClick={() => setOpen(false)}>PROJECTS</Link>
              <Link href="/about" onClick={() => setOpen(false)}>ABOUT</Link>

              <a
                href="https://www.instagram.com/hisaizu_artproject/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500"
              >
                Instagram
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* モバイル固定CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3">
        <Link
          href="/register"
          className="block w-full rounded-full bg-slate-900 py-3 text-center text-sm font-semibold text-white"
        >
          BANKに登録する
        </Link>
      </div>
    </>
  );
}