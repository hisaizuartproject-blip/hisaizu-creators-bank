'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Creator } from '@/types/creator';

export default function CreatorCard({ creator }: { creator: Creator }) {
  const activityAreas = creator.activityAreas ?? [];
  const styles = creator.styles ?? [];
  const tags = creator.tags ?? [];
  const works = creator.works ?? [];

  return (
    <Link
      href={`/creators/${creator.id}`}
      className="block w-[320px] h-[420px] cursor-pointer"
    >
      <div className="w-full h-full rounded-xl border bg-white p-4 shadow-sm flex flex-col transition hover:shadow-md hover:-translate-y-[2px]">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
            {creator.profileImage && (
              <Image
                src={creator.profileImage}
                alt={creator.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="font-semibold text-base leading-tight truncate">
              {creator.name}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {creator.prefecture} / {creator.city}
            </div>
          </div>
        </div>

        {/* Category */}
        {creator.category && (
          <div className="text-xs font-semibold text-gray-700 mb-2">
            CATEGORY : {creator.category}
          </div>
        )}

        {/* ACTIVITY */}
        {activityAreas.length > 0 && (
          <div className="mb-2">
            <div className="text-[10px] text-gray-400 mb-1">ACTIVITY</div>
            <div className="flex flex-wrap gap-1 line-clamp-2">
              {activityAreas.map((a) => (
                <span
                  key={a}
                  className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* STYLE */}
        {styles.length > 0 && (
          <div className="mb-2">
            <div className="text-[10px] text-gray-400 mb-1">STYLE</div>
            <div className="flex flex-wrap gap-1 line-clamp-2">
              {styles.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* TAGS */}
        {tags.length > 0 && (
          <div className="mb-3">
            <div className="text-[10px] text-gray-400 mb-1">TAGS</div>
            <div className="flex flex-wrap gap-1 line-clamp-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded bg-red-50 text-red-600"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Works thumbnails (bottom-fixed) */}
        {works.length > 0 && (
          <div className="mt-auto flex gap-2">
            {works.slice(0, 3).map((work, i) => (
              <div
                key={work.id ?? i}
                className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100"
              >
                {work.images?.[0] && (
                  <Image
                    src={work.images[0]}
                    alt={work.title || creator.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}