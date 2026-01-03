'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Vendor } from '@/types/vendor';

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  const availableDays = vendor.availableDays ?? [];
  const menus = vendor.menus ?? [];
  const menuNames = menus.map((m) => m.name).slice(0, 3);

  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="block w-[320px] h-[420px] cursor-pointer"
    >
      <div className="w-full h-full rounded-xl border bg-white p-4 shadow-sm flex flex-col transition hover:shadow-md hover:-translate-y-[2px]">
        {/* Header */}
        <div className="flex items-start gap-3 mb-2">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
            {vendor.profileImage && (
              <Image
                src={vendor.profileImage}
                alt={vendor.name}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="min-w-0">
            <div className="font-semibold text-base leading-tight truncate">
              {vendor.name}
            </div>
            <div className="text-sm text-gray-500 truncate">
              {vendor.prefecture} / {vendor.city}
            </div>
          </div>
        </div>

        {/* Category */}
        {vendor.category && (
          <div className="text-xs font-semibold text-gray-700 mb-1">
            CATEGORY : {vendor.category}
          </div>
        )}

        {/* Conditions */}
        <div className="flex flex-wrap gap-1 text-xs text-gray-600 mb-2">
          {vendor.needsElectricity && (
            <span className="px-2 py-0.5 rounded bg-yellow-50 text-yellow-700">
              電源
            </span>
          )}
          {vendor.needsWater && (
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700">
              水
            </span>
          )}
          {vendor.usesFire && (
            <span className="px-2 py-0.5 rounded bg-red-50 text-red-700">
              火気
            </span>
          )}
        </div>

        {/* AVAILABLE */}
        {availableDays.length > 0 && (
          <div className="mb-2">
            <div className="text-[10px] text-gray-400 mb-0.5">
              AVAILABLE
            </div>
            <div className="flex flex-wrap gap-1 line-clamp-2">
              {availableDays.map((day) => (
                <span
                  key={day}
                  className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main menu names */}
        {menuNames.length > 0 && (
          <div className="mb-3">
            <div className="text-[10px] text-gray-400 mb-0.5">
              主なメニュー
            </div>
            <div className="text-sm text-gray-700 line-clamp-1">
              {menuNames.join(' / ')}
            </div>
          </div>
        )}

        {/* Menu thumbnails (bottom-fixed) */}
        {menus.length > 0 && (
          <div className="mt-auto flex gap-2">
            {menus.slice(0, 3).map((menu, i) => (
              <div
                key={menu.id ?? i}
                className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100"
              >
                {menu.images?.[0] && (
                  <Image
                    src={menu.images[0]}
                    alt={menu.name}
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