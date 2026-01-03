'use client';

import { useState } from 'react';
import Image from 'next/image';

type VendorMenu = {
  id?: string;
  name: string;
  description?: string;
  images: string[];
};

type Props = {
  menus: VendorMenu[];
};

export default function MenuGallery({ menus }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeMenu = activeIndex !== null ? menus[activeIndex] : null;

  return (
    <>
      {/* サムネ一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menus.map((menu, i) => (
          <button
            key={menu.id ?? i}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="text-left border rounded-lg p-3 bg-white hover:shadow-sm transition"
          >
            <div className="relative w-full aspect-square rounded-md overflow-hidden bg-gray-100 mb-2">
              {menu.images?.[0] ? (
                <Image
                  src={menu.images[0]}
                  alt={menu.name}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="font-semibold text-sm">{menu.name}</div>
            {menu.description ? (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {menu.description}
              </p>
            ) : null}
          </button>
        ))}
      </div>

      {/* モーダル */}
      {activeMenu && (
        <div
          onClick={() => setActiveIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          {/* ===== 基準ラッパー ===== */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* 左ナビ */}
            {activeIndex !== null && activeIndex > 0 && (
              <button
                onClick={() => setActiveIndex(activeIndex - 1)}
                style={{
                  position: 'absolute',
                  left: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 40,
                  color: '#fff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
                aria-label="前のメニュー"
              >
                ←
              </button>
            )}

            {/* 画像ボックス（サイズ基準） */}
            <div
              style={{
                width: 900,
                maxWidth: '90vw',
                aspectRatio: '4 / 3',
                background: '#000',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {activeMenu.images?.[0] ? (
                <Image
                  src={activeMenu.images[0]}
                  alt={activeMenu.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              ) : null}

              {/* キャプション（下部） */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '10px 12px',
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0))',
                  color: '#fff',
                  fontSize: 14,
                }}
              >
                <div style={{ fontWeight: 600 }}>{activeMenu.name}</div>
                {activeMenu.description ? (
                  <div style={{ opacity: 0.85, fontSize: 12, marginTop: 2 }}>
                    {activeMenu.description}
                  </div>
                ) : null}
              </div>
            </div>

            {/* 右ナビ */}
            {activeIndex !== null && activeIndex < menus.length - 1 && (
              <button
                onClick={() => setActiveIndex(activeIndex + 1)}
                style={{
                  position: 'absolute',
                  right: -60,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 40,
                  color: '#fff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: 0.75,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
                aria-label="次のメニュー"
              >
                →
              </button>
            )}

            {/* 閉じる */}
            <button
              onClick={() => setActiveIndex(null)}
              style={{
                position: 'absolute',
                top: -40,
                right: 0,
                color: '#fff',
                fontSize: 14,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.9,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.9')}
              aria-label="閉じる"
            >
              × 閉じる
            </button>
          </div>
        </div>
      )}
    </>
  );
}