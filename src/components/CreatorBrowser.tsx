// src/components/CreatorBrowser.tsx
"use client";

import { useMemo, useState } from "react";

export type CreatorWork = {
  id: string;
  title: string;
  description: string;
  images: string[];
};

export type CreatorPublic = {
  id: string;
  name: string;
  profileImage: string | null;
  prefecture: string;
  city: string;
  category: string | null;

  approved: boolean;
  approvedAt: string | null;
  approvedBy: string | null;
  createdAt: string | null;

  tags: string[];
  styles: string[];
  activityAreas: string[];

  conditions: {
    acceptsCommission: boolean;
    acceptsExhibition: boolean;
    acceptsWorkshop: boolean;
  };

  onlineAvailable: boolean;
  instagram: string | null;
  otherLink: string | null;
  note: string | null;

  works: CreatorWork[];
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-neutral-700 bg-white">
      {children}
    </span>
  );
}

function BadgeYesNo({ yes, label }: { yes: boolean; label: string }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
        yes ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-neutral-50 text-neutral-600 border-neutral-200",
      ].join(" ")}
    >
      {label}: {yes ? "可" : "不可"}
    </span>
  );
}

function safeUrl(url: string | null | undefined) {
  if (!url) return null;
  const u = url.trim();
  if (!u) return null;
  return u;
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
    >
      <span className="font-medium">{label}</span>
      <span className="text-neutral-500 text-xs break-all">{href}</span>
    </a>
  );
}

export default function CreatorBrowser({ creators }: { creators: CreatorPublic[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("ALL");
  const [selected, setSelected] = useState<CreatorPublic | null>(null);

  const categories = useMemo(() => {
    const s = new Set<string>();
    for (const c of creators) if (c.category) s.add(c.category);
    return ["ALL", ...Array.from(s).sort()];
  }, [creators]);

  const filtered = useMemo(() => {
    const key = q.trim().toLowerCase();
    return creators.filter((c) => {
      if (cat !== "ALL" && (c.category ?? "") !== cat) return false;

      if (!key) return true;

      const hay = [
        c.name,
        c.prefecture,
        c.city,
        c.category ?? "",
        ...(c.tags ?? []),
        ...(c.styles ?? []),
        ...(c.activityAreas ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(key);
    });
  }, [creators, q, cat]);

  return (
    <div className="space-y-5">
      {/* Filter bar */}
      <section className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <div className="flex-1">
            <div className="text-xs text-neutral-500 mb-1">検索</div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="名前 / タグ / 作風 / 活動領域 / 地域 など"
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-neutral-200"
            />
          </div>

          <div className="md:w-64">
            <div className="text-xs text-neutral-500 mb-1">カテゴリ</div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="w-full rounded-xl border px-3 py-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-neutral-200"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "ALL" ? "すべて" : c}
                </option>
              ))}
            </select>
          </div>

          <div className="md:text-right text-sm text-neutral-600">
            <div className="font-semibold">{filtered.length}</div>
            <div className="text-xs">creators</div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((c) => {
          const loc = [c.prefecture, c.city].filter(Boolean).join(" ");
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c)}
              className="text-left rounded-2xl border bg-white p-4 md:p-5 shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  {c.profileImage ? (
                    // next/image だと domain 設定に左右されやすいので、外部URLは img で確実に表示
                    <img
                      src={c.profileImage}
                      alt={c.name}
                      className="h-20 w-20 rounded-xl object-cover border bg-neutral-100"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-xl border bg-neutral-100" />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-bold text-lg truncate">{c.name}</div>
                      <div className="text-sm text-neutral-600 truncate">{loc}</div>
                    </div>
                    {c.category ? <Chip>{c.category}</Chip> : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {c.tags?.slice(0, 3).map((t) => (
                      <Chip key={t}>#{t}</Chip>
                    ))}
                    {c.tags && c.tags.length > 3 ? <Chip>+{c.tags.length - 3}</Chip> : null}
                  </div>

                  <div className="text-xs text-neutral-500">
                    作風: {c.styles?.length ? c.styles.join(" / ") : "—"}{" "}
                    <span className="mx-2">•</span>
                    分野: {c.activityAreas?.length ? c.activityAreas.join(" / ") : "—"}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </section>

      {/* Modal */}
      {selected && (
        <CreatorModal
          creator={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

function CreatorModal({ creator, onClose }: { creator: CreatorPublic; onClose: () => void }) {
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const loc = [creator.prefecture, creator.city].filter(Boolean).join(" ");
  const insta = safeUrl(creator.instagram);
  const other = safeUrl(creator.otherLink);

  return (
    <>
      {/* overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      {/* modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl rounded-2xl bg-white shadow-xl border overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <div className="min-w-0">
              <div className="text-sm text-neutral-500">{creator.category ?? "CREATOR"}</div>
              <div className="font-bold text-xl truncate">{creator.name}</div>
              <div className="text-sm text-neutral-600">{loc || "—"}</div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
            >
              閉じる
            </button>
          </div>

          <div className="grid md:grid-cols-[260px,1fr] gap-0">
            {/* left */}
            <div className="p-5 border-b md:border-b-0 md:border-r bg-neutral-50">
              <div className="flex gap-3 items-start">
                {creator.profileImage ? (
                  <img
                    src={creator.profileImage}
                    alt={creator.name}
                    className="h-24 w-24 rounded-2xl object-cover border bg-white"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-2xl border bg-white" />
                )}

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <BadgeYesNo yes={creator.conditions.acceptsCommission} label="依頼" />
                    <BadgeYesNo yes={creator.conditions.acceptsExhibition} label="展示" />
                    <BadgeYesNo yes={creator.conditions.acceptsWorkshop} label="WS" />
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
                        creator.onlineAvailable
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-neutral-50 text-neutral-600 border-neutral-200",
                      ].join(" ")}
                    >
                      オンライン: {creator.onlineAvailable ? "可" : "不可"}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-500">
                    登録: {creator.createdAt ? new Date(creator.createdAt).toLocaleString("ja-JP") : "—"}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {creator.tags?.length ? (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-neutral-700">タグ</div>
                    <div className="flex flex-wrap gap-2">
                      {creator.tags.map((t) => (
                        <Chip key={t}>#{t}</Chip>
                      ))}
                    </div>
                  </div>
                ) : null}

                {creator.styles?.length ? (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-neutral-700">作風</div>
                    <div className="flex flex-wrap gap-2">
                      {creator.styles.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </div>
                ) : null}

                {creator.activityAreas?.length ? (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-neutral-700">興味のある分野</div>
                    <div className="flex flex-wrap gap-2">
                      {creator.activityAreas.map((a) => (
                        <Chip key={a}>{a}</Chip>
                      ))}
                    </div>
                  </div>
                ) : null}

                {(insta || other) && (
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-neutral-700">リンク</div>
                    <div className="grid gap-2">
                      {insta ? <ExternalLink href={insta} label="Instagram" /> : null}
                      {other ? <ExternalLink href={other} label="Other" /> : null}
                    </div>
                  </div>
                )}

                {creator.note ? (
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-neutral-700">メモ</div>
                    <div className="text-sm whitespace-pre-wrap text-neutral-700 rounded-xl border bg-white p-3">
                      {creator.note}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* right */}
            <div className="p-5 space-y-6">
              <section className="space-y-2">
                <h3 className="text-sm font-bold tracking-wide">制作事例</h3>

                {creator.works?.length ? (
                  <div className="space-y-5">
                    {creator.works.map((w) => (
                      <div key={w.id} className="rounded-2xl border p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="font-bold text-base">{w.title || "Untitled"}</div>
                            {w.description ? (
                              <div className="mt-1 text-sm text-neutral-700 whitespace-pre-wrap">
                                {w.description}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {w.images?.length ? (
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                            {w.images.map((url, idx) => (
                              <button
                                key={`${w.id}-${idx}`}
                                type="button"
                                onClick={() => setLightboxUrl(url)}
                                className="group rounded-xl border overflow-hidden bg-neutral-50"
                                title="クリックで拡大"
                              >
                                <div className="aspect-[4/3] w-full bg-neutral-100">
                                  <img
                                    src={url}
                                    alt={`${w.title}-${idx + 1}`}
                                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
                                    loading="lazy"
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-3 text-sm text-neutral-500">画像なし</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-neutral-500">制作事例はまだ登録されていません。</div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* lightbox */}
      {lightboxUrl && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/70"
            onClick={() => setLightboxUrl(null)}
          />
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="w-full max-w-5xl rounded-2xl bg-white border shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="text-sm font-semibold">画像プレビュー</div>
                <button
                  type="button"
                  onClick={() => setLightboxUrl(null)}
                  className="rounded-xl border px-3 py-2 text-sm hover:bg-neutral-50"
                >
                  閉じる
                </button>
              </div>
              <div className="p-4 bg-neutral-50">
                <div className="max-h-[75vh] overflow-auto rounded-xl border bg-white">
                  <img
                    src={lightboxUrl}
                    alt="preview"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}