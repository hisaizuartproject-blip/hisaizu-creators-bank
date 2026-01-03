// components/register/vendor/Step2Menu.tsx
"use client";

import MultiImageUploader from "@/components/forms/MultiImageUploader";

export type VendorMenu = {
  id: string;
  name: string;
  description: string | null;
  images: string[];
};

type Props = {
  menus: VendorMenu[];
  onChange: (menus: VendorMenu[]) => void;
};

export default function Step2Menu({ menus, onChange }: Props) {
  const addMenu = () => {
    onChange([
      ...menus,
      {
        id: crypto.randomUUID(),
        name: "",
        description: null,
        images: [],
      },
    ]);
  };

  const updateMenu = (
    id: string,
    patch: Partial<VendorMenu>
  ) => {
    onChange(
      menus.map((m) =>
        m.id === id ? { ...m, ...patch } : m
      )
    );
  };

  const removeMenu = (id: string) => {
    if (!confirm("このメニューを削除しますか？")) return;
    onChange(menus.filter((m) => m.id !== id));
  };

  return (
    <section className="border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold">
          主なメニュー
        </h2>
        <p className="text-sm text-gray-500">
          実際に提供している代表的な商品を登録してください（1件以上必須）
        </p>
      </div>

      {menus.map((menu, index) => (
        <div
          key={menu.id}
          className="border p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <div className="font-semibold">
              メニュー {index + 1}
            </div>
            <button
              type="button"
              className="text-sm text-red-600"
              onClick={() => removeMenu(menu.id)}
            >
              削除
            </button>
          </div>

          <input
            className="border p-2 w-full"
            placeholder="メニュー名（必須）"
            value={menu.name}
            onChange={(e) =>
              updateMenu(menu.id, {
                name: e.target.value,
              })
            }
          />

          <textarea
            className="border p-2 w-full"
            rows={3}
            placeholder="説明・こだわり（任意）"
            value={menu.description ?? ""}
            onChange={(e) =>
              updateMenu(menu.id, {
                description: e.target.value || null,
              })
            }
          />

          <MultiImageUploader
            label="メニュー写真（必須・最大5枚）"
            max={5}
            value={menu.images}
            onUploaded={(urls) =>
              updateMenu(menu.id, {
                images: urls,
              })
            }
          />
        </div>
      ))}

      <button
        type="button"
        className="border px-4 py-2"
        onClick={addMenu}
      >
        ＋ メニューを追加
      </button>
    </section>
  );
}