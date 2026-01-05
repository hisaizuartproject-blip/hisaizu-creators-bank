"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
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

            <a
              href="https://www.instagram.com/hisaizu_artproject/"
              target="_blank"
              className="text-slate-500 hover:text-slate-900"
            >
              Instagram
            </a>

            <Link
              href="/register"
              className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
            >
              BANKに登録
            </Link>
          </nav>

          {/* モバイルボタン */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-slate-700"
            aria-label="menu"
          >
            ☰
          </button>
        </div>

        {/* モバイルメニュー */}
        {open && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>HOME</Link>
            <Link href="/creators" onClick={() => setOpen(false)}>CREATORS</Link>
            <Link href="/vendors" onClick={() => setOpen(false)}>VENDORS</Link>
            <Link href="/projects" onClick={() => setOpen(false)}>PROJECTS</Link>
            <Link href="/about" onClick={() => setOpen(false)}>ABOUT</Link>

            <a
              href="https://www.instagram.com/hisaizu_artproject/"
              target="_blank"
              className="block text-slate-500"
            >
              Instagram
            </a>
          </div>
        )}
      </header>

      {/* モバイル固定CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-3">
        <Link
          href="/register"
          className="block w-full text-center rounded-full bg-slate-900 py-3 text-sm font-semibold text-white"
        >
          BANKに登録する
        </Link>
      </div>
    </>
  );
}