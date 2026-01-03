import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import WorkGallery from '@/components/creators/WorkGallery.client';
import type { Creator, CreatorWork } from '@/types/creator';

type PageProps = {
  // Next.js 16系で params が Promise 扱いになるケースの対策
  params: Promise<{ id: string }> | { id: string };
};

function asArray<T>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}

/* =========================
   OGP / Metadata
========================= */
export async function generateMetadata(props: PageProps) {
  const params = await Promise.resolve(props.params);
  const snap = await getDoc(doc(db, 'creators', params.id));
  if (!snap.exists()) return {};

  const data = snap.data() as any;

  const name = (data?.name ?? '').toString();
  const prefecture = (data?.prefecture ?? '').toString();
  const city = (data?.city ?? '').toString();

  const ogImage: string | undefined =
    data?.works?.[0]?.images?.[0] ??
    data?.profileImage ??
    undefined;

  const title = name
    ? `${name}｜HISAIZU CREATORS BANK`
    : 'HISAIZU CREATORS BANK';

  const description = `${prefecture} ${city} を拠点に活動するクリエイター`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

/* =========================
   Page
========================= */
export default async function CreatorDetailPage(props: PageProps) {
  const params = await Promise.resolve(props.params);

  const snap = await getDoc(doc(db, 'creators', params.id));
  if (!snap.exists()) notFound();

  const data = snap.data() as any;

  const worksRaw = asArray<CreatorWork>(data.works).map((w: any) => ({
    id: w?.id ?? undefined,
    title: w?.title ?? undefined,
    description: w?.description ?? undefined,
    images: asArray<string>(w?.images),
  }));

  const creator: Creator = {
    id: snap.id,
    approved: data.approved === true,

    name: data.name ?? '',
    category: data.category ?? undefined,
    prefecture: data.prefecture ?? '',
    city: data.city ?? '',
    profileImage: data.profileImage ?? null,

    activityAreas: asArray<string>(data.activityAreas),
    styles: asArray<string>(data.styles),
    tags: asArray<string>(data.tags),

    acceptsCommission: data.acceptsCommission === true,
    acceptsWorkshop: data.acceptsWorkshop === true,
    acceptsExhibition: data.acceptsExhibition === true,
    onlineAvailable: data.onlineAvailable === true,

    instagram: data.instagram ?? null,
    otherLink: data.otherLink ?? null,
    note: data.note ?? null,

    works: worksRaw,
  };

  return (
    <main className="px-10 py-10 max-w-6xl mx-auto">
      {/* 戻る導線 */}
      <Link
        href="/creators"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        ← クリエイター一覧に戻る
      </Link>

      {/* ヘッダー */}
      <div className="flex items-start gap-6 mb-10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 shrink-0">
          {creator.profileImage ? (
            <Image
              src={creator.profileImage}
              alt={creator.name}
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <h1 className="text-3xl font-bold">{creator.name}</h1>
          <p className="text-gray-500 mt-1">
            {creator.prefecture} / {creator.city}
          </p>

          {creator.category ? (
            <p className="text-sm mt-2">
              <span className="font-semibold">CATEGORY :</span> {creator.category}
            </p>
          ) : null}
        </div>
      </div>

      {/* ACTIVITY */}
      {creator.activityAreas.length > 0 ? (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-2">ACTIVITY</h2>
          <div className="flex flex-wrap gap-2">
            {creator.activityAreas.map((a) => (
              <span
                key={a}
                className="text-sm px-3 py-1 rounded bg-blue-50 text-blue-700"
              >
                {a}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* STYLE */}
      {creator.styles.length > 0 ? (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-2">STYLE</h2>
          <div className="flex flex-wrap gap-2">
            {creator.styles.map((s) => (
              <span
                key={s}
                className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* TAGS */}
      {creator.tags.length > 0 ? (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-2">TAGS</h2>
          <div className="flex flex-wrap gap-2">
            {creator.tags.map((t) => (
              <span
                key={t}
                className="text-sm px-3 py-1 rounded bg-red-50 text-red-600"
              >
                #{t}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* CONDITIONS */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-2">CONDITIONS</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>依頼対応：{creator.acceptsCommission ? '可' : '不可'}</li>
          <li>展示対応：{creator.acceptsExhibition ? '可' : '不可'}</li>
          <li>WS対応：{creator.acceptsWorkshop ? '可' : '不可'}</li>
          <li>オンライン：{creator.onlineAvailable ? '可' : '不可'}</li>
        </ul>
      </section>

      {/* LINKS */}
      {(creator.instagram || creator.otherLink) ? (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-2">LINKS</h2>
          <ul className="text-sm space-y-1">
            {creator.instagram ? (
              <li>
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Instagram
                </a>
              </li>
            ) : null}
            {creator.otherLink ? (
              <li>
                <a
                  href={creator.otherLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Website / Link
                </a>
              </li>
            ) : null}
          </ul>
        </section>
      ) : null}

      {/* NOTE */}
      {creator.note ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-2">NOTE</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {creator.note}
          </p>
        </section>
      ) : (
        <div className="mb-10" />
      )}

      {/* WORKS */}
      {creator.works.length > 0 ? (
        <section>
          <h2 className="text-xl font-semibold mb-4">WORKS</h2>
          {/* ここで WorkGallery（モーダル） */}
          <WorkGallery works={creator.works} />
        </section>
      ) : null}
    </main>
  );
}