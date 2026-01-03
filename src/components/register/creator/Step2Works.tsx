// components/register/creator/Step2Works.tsx
"use client";

import { v4 as uuid } from "uuid";
import MultiImageUploader from "@/components/forms/MultiImageUploader";

export type CreatorWork = {
  id: string;
  title: string;
  description: string | null;
  images: string[];
};

type Props = {
  works: CreatorWork[];
  onChange: (works: CreatorWork[]) => void;
};

export default function Step2Works({ works, onChange }: Props) {
  const addWork = () => {
    onChange([
      ...works,
      {
        id: uuid(),
        title: "",
        description: null,
        images: [],
      },
    ]);
  };

  const updateWork = (
    id: string,
    patch: Partial<CreatorWork>
  ) => {
    onChange(
      works.map((w) =>
        w.id === id ? { ...w, ...patch } : w
      )
    );
  };

  const removeWork = (id: string) => {
    onChange(works.filter((w) => w.id !== id));
  };

  return (
    <section className="border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold">代表作品</h2>
        <p className="text-sm text-gray-500">
          管理画面・一覧表示に使用されます
        </p>
      </div>

      {works.length === 0 && (
        <p className="text-sm text-gray-500">
          作品はまだ登録されていません
        </p>
      )}

      <div className="space-y-6">
        {works.map((work, index) => (
          <div
            key={work.id}
            className="border p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                作品 {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeWork(work.id)}
                className="text-sm text-red-600"
              >
                削除
              </button>
            </div>

            {/* 作品名 */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                作品名
              </label>
              <input
                className="border p-2 w-full"
                value={work.title}
                onChange={(e) =>
                  updateWork(work.id, {
                    title: e.target.value,
                  })
                }
              />
            </div>

            {/* 説明 */}
            <div className="space-y-1">
              <label className="text-sm font-medium">
                コンセプト・説明（任意）
              </label>
              <textarea
                rows={3}
                className="border p-2 w-full"
                value={work.description ?? ""}
                onChange={(e) =>
                  updateWork(work.id, {
                    description:
                      e.target.value || null,
                  })
                }
              />
            </div>

            {/* 画像 */}
            <MultiImageUploader
              label="作品画像（最大5枚）"
              max={5}
              value={work.images}
              onUploaded={(urls) =>
                updateWork(work.id, {
                  images: urls,
                })
              }
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addWork}
        className="border px-4 py-2"
      >
        ＋ 作品を追加
      </button>
    </section>
  );
}