"use client";

import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

type Props = {
  label: string;
  max?: number;
  value?: string[];                 // ★追加
  onUploaded: (urls: string[]) => void;
};

export default function MultiImageUploader({
  label,
  max = 1,
  value = [],
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, max);
    if (!files.length) return;

    setUploading(true);
    try {
      const urls: string[] = [];

      for (const file of files) {
        const fileRef = ref(
          storage,
          `uploads/${crypto.randomUUID()}-${file.name}`
        );
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        urls.push(url);
      }

      onUploaded(urls);
    } finally {
      setUploading(false);
      setInputKey(k => k + 1); // Safari対策
    }
  };

  return (
    <div className="space-y-2">
      <div className="font-semibold">{label}</div>

      <input
        key={inputKey}
        type="file"
        accept="image/*"
        multiple={max > 1}
        disabled={uploading}
        onChange={handleChange}
      />

      {uploading && (
        <div className="text-sm text-gray-500">アップロード中…</div>
      )}

      {/* ★ プレビュー表示 */}
      {value.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-2">
          {value.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="uploaded"
              className="w-32 h-32 object-cover border"
            />
          ))}
        </div>
      )}
    </div>
  );
}