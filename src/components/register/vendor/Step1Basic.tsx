"use client";

import MultiImageUploader from "@/components/forms/MultiImageUploader";
import LocationInput from "@/components/common/LocationInput";

export type VendorCategory = "FOOD" | "RETAIL" | "SERVICE" | "PR";

type Props = {
  name: string;
  category: VendorCategory | "";
  representative: string;
  email: string;
  phone: string;
  prefecture: string;
  city: string;
  profileImage: string | null;

  onChangeName: (v: string) => void;
  onChangeCategory: (v: VendorCategory | "") => void;
  onChangeRepresentative: (v: string) => void;
  onChangeEmail: (v: string) => void;
  onChangePhone: (v: string) => void;
  onChangePrefecture: (v: string) => void;
  onChangeCity: (v: string) => void;
  onChangeProfileImage: (url: string) => void;
};

export default function Step1Basic({
  name,
  category,
  representative,
  email,
  phone,
  prefecture,
  city,
  profileImage,

  onChangeName,
  onChangeCategory,
  onChangeRepresentative,
  onChangeEmail,
  onChangePhone,
  onChangePrefecture,
  onChangeCity,
  onChangeProfileImage,
}: Props) {
  return (
    <section className="border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">基本情報</h2>
        <p className="text-sm text-gray-500">
          一覧表示やイベント管理に使用される情報です
        </p>
      </div>

      {/* 屋号 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          屋号（必須）
        </label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="例：たこ太郎"
        />
      </div>

      {/* カテゴリ */}
      <div>
        <label className="block text-sm font-medium mb-1">
          カテゴリ（必須）
        </label>
        <select
          className="border p-2 w-full"
          value={category}
          onChange={(e) =>
            onChangeCategory(e.target.value as VendorCategory)
          }
        >
          <option value="">選択してください</option>
          <option value="FOOD">FOOD（飲食）</option>
          <option value="RETAIL">RETAIL（物販）</option>
          <option value="SERVICE">SERVICE（サービス）</option>
          <option value="PR">PR・展示</option>
        </select>
      </div>

      {/* プロフィール画像 */}
      <div>
        <MultiImageUploader
          label="プロフィール画像（一覧用・必須）"
          max={1}
          value={profileImage ? [profileImage] : []}
          onUploaded={(urls) => {
            if (urls[0]) onChangeProfileImage(urls[0]);
          }}
        />
        <p className="text-xs text-gray-500 mt-1">
          ロゴ・キッチンカー外観・看板など（一覧表示に使用）
        </p>
      </div>

      {/* 代表者 */}
      <div>
        <label className="block text-sm font-medium mb-1">
          代表者名（必須）
        </label>
        <input
          className="border p-2 w-full"
          value={representative}
          onChange={(e) => onChangeRepresentative(e.target.value)}
          placeholder="例：山田 太郎"
        />
      </div>

      {/* 連絡先 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            メールアドレス（必須）
          </label>
          <input
            type="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            電話番号（必須）
          </label>
          <input
            className="border p-2 w-full"
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder="09012345678"
          />
        </div>
      </div>

      {/* 所在地 */}
      <LocationInput
        prefecture={prefecture}
        city={city}
        onChangePrefecture={onChangePrefecture}
        onChangeCity={onChangeCity}
      />
    </section>
  );
}