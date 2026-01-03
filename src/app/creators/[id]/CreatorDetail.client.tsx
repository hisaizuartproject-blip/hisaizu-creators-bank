'use client';

import Image from 'next/image';
import Link from 'next/link';
import WorkGallery from '@/components/creators/WorkGallery.client';
import { Creator } from '@/types/creator';

type Props = {
  creator: Creator;
};

export default function CreatorDetailClient({ creator }: Props) {
  return (
    <main className="px-10 py-10 max-w-6xl mx-auto">
      {/* 戻る */}
      <Link
        href="/creators"
        className="inline-block text-sm text-gray-500 hover:text-black mb-6"
      >
        ← クリエイター一覧に戻る
      </Link>

      {/* ヘッダー */}
      <div className="flex items-start gap-6 mb-10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200">
          {creator.profileImage && (
            <Image
              src={creator.profileImage}
              alt={creator.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{creator.name}</h1>
          <p className="text-gray-500 mt-1">
            {creator.prefecture} / {creator.city}
          </p>

          {creator.category && (
            <p className="text-sm mt-2">
              <span className="font-semibold">CATEGORY :</span>{' '}
              {creator.category}
            </p>
          )}
        </div>
      </div>

      {/* WORKS */}
      {creator.works.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">WORKS</h2>
          <WorkGallery works={creator.works} />
        </section>
      )}
    </main>
  );
}