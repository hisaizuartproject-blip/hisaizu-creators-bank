'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CreatorWork } from '@/types/creator';

type Props = {
  works: CreatorWork[];
};

export default function WorkGallery({ works }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {/* ===== サムネイル ===== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
      >
        {works.map((work, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{ cursor: 'pointer' }}
          >
            <div
              style={{
                aspectRatio: '1 / 1',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 8,
                background: '#eee',
              }}
            >
              {work.images?.[0] && (
                <Image
                  src={work.images[0]}
                  alt=""
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ===== モーダル ===== */}
      {activeIndex !== null && (() => {
        const work = works[activeIndex];

        return (
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
              {activeIndex > 0 && (
                <button
                  onClick={() => setActiveIndex(activeIndex - 1)}
                  style={navStyle('left')}
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
                {work.images?.[0] && (
                  <Image
                    src={work.images[0]}
                    alt=""
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                )}
              </div>

              {/* 右ナビ */}
              {activeIndex < works.length - 1 && (
                <button
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  style={navStyle('right')}
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
                }}
              >
                × 閉じる
              </button>
            </div>
          </div>
        );
      })()}
    </>
  );
}

/* ===== ナビ共通スタイル ===== */
function navStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: -60,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 40,
    color: '#fff',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0.6,
    transition: 'opacity 0.2s',
  };
}