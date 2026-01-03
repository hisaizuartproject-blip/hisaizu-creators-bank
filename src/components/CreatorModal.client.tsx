"use client";

import { useState } from "react";
import Image from "next/image";

export default function CreatorModal({ creators }: { creators: any[] }) {
  const [active, setActive] = useState<any | null>(null);

  return (
    <>
      {/* 一覧 */}
      <div className="grid grid-cols-3 gap-6">
        {creators.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className="border rounded-xl p-4 text-left hover:shadow"
          >
            <Image
              src={c.profileImage}
              alt={c.name}
              width={80}
              height={80}
              className="rounded-full"
            />
            <h3 className="font-bold mt-2">{c.name}</h3>
            <p className="text-sm text-gray-600">{c.prefecture} / {c.city}</p>

            <div className="flex flex-wrap gap-1 mt-2">
              {c.tags?.map((t: string) => (
                <span key={t} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                  #{t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* モーダル */}
      {active && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white max-w-4xl w-full rounded-xl p-6 relative">
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold">{active.name}</h2>

            <div className="flex gap-2 mt-2">
              {active.styles?.map((s: string) => (
                <span key={s} className="text-xs bg-black text-white px-3 py-1 rounded-full">
                  {s}
                </span>
              ))}
            </div>

            <section className="mt-6 grid grid-cols-3 gap-4">
              {active.works?.flatMap((w: any) =>
                w.images?.map((img: string) => (
                  <Image
                    key={img}
                    src={img}
                    alt={w.title}
                    width={400}
                    height={400}
                    className="rounded"
                  />
                ))
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}