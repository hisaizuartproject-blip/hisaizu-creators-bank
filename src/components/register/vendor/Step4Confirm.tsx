// components/register/vendor/Step4Confirm.tsx
"use client";

import { VendorMenu } from "./Step2Menu";
import { VendorConditions } from "./Step3Conditions";

type Props = {
  data: {
    name: string;
    category: string;
    representative: string;
    email: string;
    phone: string;
    prefecture: string;
    city: string;
    menus: VendorMenu[];
    conditions: VendorConditions;
    profileImage?: string | null;
  };
};

export default function Step4Confirm({ data }: Props) {
  const {
    name,
    category,
    representative,
    email,
    phone,
    prefecture,
    city,
    menus,
    conditions,
    profileImage,
  } = data;

  return (
    <section className="border p-6 space-y-6">
      <h2 className="text-lg font-bold">登録内容の確認</h2>

      {/* =====================
       * 基本情報
       * ===================== */}
      <div className="space-y-2">
        <h3 className="font-semibold">基本情報</h3>

        {profileImage && (
          <div className="w-32">
            <p className="text-sm text-gray-500 mb-1">プロフィール画像</p>
            <img
              src={profileImage}
              alt="プロフィール画像"
              className="w-32 h-32 object-cover border"
            />
          </div>
        )}

        <p>屋号：{name}</p>
        <p>カテゴリ：{category}</p>
        <p>代表者：{representative}</p>
        <p>メール：{email}</p>
        <p>電話番号：{phone}</p>
        <p>
          所在地：{prefecture} {city}
        </p>
      </div>

      {/* =====================
       * 主なメニュー
       * ===================== */}
      <div className="space-y-3">
        <h3 className="font-semibold">主なメニュー</h3>

        {menus.length === 0 && (
          <p className="text-sm text-gray-500">メニューは未登録です</p>
        )}

        <div className="space-y-4">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="border p-3 space-y-2"
            >
              <p className="font-medium">{menu.name}</p>

              {menu.description && (
                <p className="text-sm text-gray-600">
                  {menu.description}
                </p>
              )}

              {/* メニュー画像プレビュー */}
              {menu.images && menu.images.length > 0 && (
                <div className="flex gap-2 flex-wrap pt-2">
                  {menu.images.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`${menu.name} 画像${i + 1}`}
                      className="w-24 h-24 object-cover border"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =====================
       * 出店条件
       * ===================== */}
      <div className="space-y-1">
        <h3 className="font-semibold">出店条件</h3>
        <p>
          サイズ：
          {conditions.size.width} ×
          {conditions.size.depth} ×
          {conditions.size.height} cm
        </p>
        <p>電源：{conditions.needsElectricity ? "必要" : "不要"}</p>
        <p>水道：{conditions.needsWater ? "必要" : "不要"}</p>
        <p>火気：{conditions.usesFire ? "使用する" : "使用しない"}</p>
        <p>
          出店可能日：
          {conditions.availableDays.length > 0
            ? conditions.availableDays.join("・")
            : "指定なし"}
        </p>
        {conditions.note && (
          <p className="text-sm text-gray-600">
            備考：{conditions.note}
          </p>
        )}
      </div>

      <p className="text-sm text-gray-500">
        ※ 登録後は管理者の承認をもって公開されます
      </p>
    </section>
  );
}