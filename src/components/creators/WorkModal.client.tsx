'use client';

import Image from 'next/image';

export default function WorkModal({
  image,
  title,
  onClose,
}: {
  image: string;
  title?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image}
          alt={title || ''}
          width={1200}
          height={1200}
          className="object-contain rounded"
        />
        {title && (
          <div className="text-white text-sm mt-2 text-center">{title}</div>
        )}
      </div>
    </div>
  );
}