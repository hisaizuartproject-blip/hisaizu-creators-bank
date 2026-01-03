"use client";

import LocationInput from "@/components/common/LocationInput";
import MultiImageUploader from "@/components/forms/MultiImageUploader";

export type CreatorCategory =
  | "ART"
  | "DESIGN"
  | "CRAFT"
  | "PHOTO"
  | "ILLUSTRATION"
  | "OTHER";

type Props = {
  name: string;
  category: CreatorCategory | "";
  profileImage: string | null;
  email: string;
  phone: string;
  prefecture: string;
  city: string;

  onChangeName: (v: string) => void;
  onChangeCategory: (v: CreatorCategory | "") => void;
  onChangeProfileImage: (v: string | null) => void;
  onChangeEmail: (v: string) => void;
  onChangePhone: (v: string) => void;
  onChangePrefecture: (v: string) => void;
  onChangeCity: (v: string) => void;
};

export default function Step1Basic({
  name,
  category,
  profileImage,
  email,
  phone,
  prefecture,
  city,
  onChangeName,
  onChangeCategory,
  onChangeProfileImage,
  onChangeEmail,
  onChangePhone,
  onChangePrefecture,
  onChangeCity,
}: Props) {
  return (
    <section className="border p-6 space-y-6">
      <h2 className="text-lg font-bold">基本情報</h2>

      {/* 表示名 */}
      <div className="space-y-1">
        <label className="font-semibold">表示名（活動名）</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
      </div>

      {/* ジャンル */}
      <div className="space-y-1">
        <label className="font-semibold">ジャンル</label>
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) =>
            onChangeCategory(e.target.value as CreatorCategory)
          }
        >
          <option value="">選択してください</option>
          <option value="ART">アート</option>
          <option value="DESIGN">デザイン</option>
          <option value="CRAFT">クラフト</option>
          <option value="PHOTO">写真</option>
          <option value="ILLUSTRATION">イラスト</option>
          <option value="OTHER">その他</option>
        </select>
      </div>

      {/* メール */}
      <div className="space-y-1">
        <label className="font-semibold">メールアドレス</label>
        <input
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
      </div>

      {/* 電話番号 */}
      <div className="space-y-1">
        <label className="font-semibold">電話番号</label>
        <input
          className="border p-2 w-full"
          value={phone}
          onChange={(e) => onChangePhone(e.target.value)}
        />
      </div>

      {/* 所在地 */}
      <LocationInput
        prefecture={prefecture}
        city={city}
        onChangePrefecture={onChangePrefecture}
        onChangeCity={onChangeCity}
      />

      {/* プロフィール画像（最後） */}
      <div className="space-y-2 pt-4 border-t">
        <label className="font-semibold">プロフィール画像</label>

        <MultiImageUploader
          label="プロフィール画像（1枚）"
          max={1}
          value={profileImage ? [profileImage] : []}
          onUploaded={(urls) =>
            onChangeProfileImage(urls[0] ?? null)
          }
        />

        <p className="text-xs text-gray-500">
          ※ 一覧・プロフィール表示に使用されます
        </p>
      </div>
    </section>
  );
}