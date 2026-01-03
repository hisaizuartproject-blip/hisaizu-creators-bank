import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import MenuGallery from '@/components/vendors/MenuGallery.client';

/* =========================
   Types
========================= */

type VendorMenu = {
  id?: string;
  name: string;
  description?: string;
  images: string[];
};

type VendorSize = {
  width: number;
  depth: number;
  height: number;
};

type Vendor = {
  id: string;
  approved: boolean;

  name: string;
  category?: string;
  prefecture: string;
  city: string;
  profileImage?: string | null;
  representative?: string;

  availableDays: string[];

  needsElectricity: boolean;
  needsWater: boolean;
  usesFire: boolean;

  size: VendorSize | null;

  menus: VendorMenu[];
  note?: string | null;
};

/* =========================
   Utils
========================= */

function asArray<T>(v: any): T[] {
  return Array.isArray(v) ? v : [];
}

/* =========================
   Page
========================= */

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function VendorDetailPage(props: PageProps) {
  const params = await Promise.resolve(props.params);

  const snap = await getDoc(doc(db, 'vendors', params.id));
  if (!snap.exists()) notFound();

  const data = snap.data() as any;

  /* ===== 正規化 ===== */

  const vendor: Vendor = {
    id: snap.id,
    approved: data.approved === true,

    name: data.name ?? '',
    category: data.category ?? undefined,
    prefecture: data.prefecture ?? '',
    city: data.city ?? '',
    profileImage: data.profileImage ?? null,
    representative: data.representative ?? undefined,

    availableDays: asArray<string>(data.availableDays),

    needsElectricity: data.needsElectricity === true,
    needsWater: data.needsWater === true,
    usesFire: data.usesFire === true,

    size:
      data.size &&
      typeof data.size.width === 'number' &&
      typeof data.size.depth === 'number' &&
      typeof data.size.height === 'number'
        ? {
            width: data.size.width,
            depth: data.size.depth,
            height: data.size.height,
          }
        : null,

    menus: asArray<any>(data.menus).map((m) => ({
      id: m?.id ?? undefined,
      name: m?.name ?? '',
      description: m?.description ?? undefined,
      images: asArray<string>(m?.images),
    })),

    note: data.note ?? null,
  };

  /* =========================
     Render
  ========================= */

  return (
    <main className="px-10 py-10 max-w-6xl mx-auto">
      {/* 戻る */}
      <Link
        href="/vendors"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        ← 出店者一覧に戻る
      </Link>

      {/* Header */}
      <div className="flex items-start gap-6 mb-10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 shrink-0">
          {vendor.profileImage ? (
            <Image
              src={vendor.profileImage}
              alt={vendor.name}
              fill
              sizes="128px"
              className="object-cover"
              priority
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <h1 className="text-3xl font-bold">{vendor.name}</h1>
          <p className="text-gray-500 mt-1">
            {vendor.prefecture} / {vendor.city}
          </p>

          {vendor.category ? (
            <p className="text-sm mt-2">
              <span className="font-semibold">CATEGORY :</span> {vendor.category}
            </p>
          ) : null}

          {vendor.representative ? (
            <p className="text-sm mt-1 text-gray-600">
              代表者：{vendor.representative}
            </p>
          ) : null}
        </div>
      </div>

      {/* AVAILABLE */}
      {vendor.availableDays.length > 0 ? (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-2">AVAILABLE</h2>
          <div className="flex flex-wrap gap-2">
            {vendor.availableDays.map((d) => (
              <span
                key={d}
                className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700"
              >
                {d}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {/* CONDITIONS */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold mb-2">CONDITIONS</h2>

        <div className="flex flex-wrap gap-2 mb-3">
          {vendor.needsElectricity ? (
            <span className="text-sm px-3 py-1 rounded bg-yellow-50 text-yellow-700">
              電源：あり
            </span>
          ) : (
            <span className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700">
              電源：なし
            </span>
          )}

          {vendor.needsWater ? (
            <span className="text-sm px-3 py-1 rounded bg-blue-50 text-blue-700">
              水：あり
            </span>
          ) : (
            <span className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700">
              水：なし
            </span>
          )}

          {vendor.usesFire ? (
            <span className="text-sm px-3 py-1 rounded bg-red-50 text-red-700">
              火気：あり
            </span>
          ) : (
            <span className="text-sm px-3 py-1 rounded bg-gray-100 text-gray-700">
              火気：なし
            </span>
          )}
        </div>

        {vendor.size ? (
          <p className="text-sm text-gray-700">
            車両サイズ：{vendor.size.width} × {vendor.size.depth} × {vendor.size.height}
          </p>
        ) : null}
      </section>

      {/* MENUS（モーダル対応） */}
      {vendor.menus.length > 0 ? (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">MENUS</h2>
          <MenuGallery menus={vendor.menus} />
        </section>
      ) : null}

      {/* NOTE */}
      {vendor.note ? (
        <section className="mb-10">
          <h2 className="text-sm font-semibold mb-2">NOTE</h2>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {vendor.note}
          </p>
        </section>
      ) : null}
    </main>
  );
}