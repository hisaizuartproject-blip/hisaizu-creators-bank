"use client";

import { CreatorConditions } from "./Step3Conditions";
import { CreatorWork } from "./Step2Works";

type Props = {
  data: {
    name: string;
    category: string;
    profileImage: string | null;
    prefecture: string;
    city: string;

    works: CreatorWork[];
    conditions: CreatorConditions;
  };
};

export default function Step4Confirm({ data }: Props) {
  const {
    name,
    category,
    profileImage,
    prefecture,
    city,
    works,
    conditions,
  } = data;

  return (
    <section className="border p-6 space-y-8">
      <h2 className="text-lg font-bold">登録内容の確認</h2>

      {/* 基本情報 */}
      <section className="space-y-2">
        <h3 className="font-semibold">基本情報</h3>

        {profileImage && (
          <img
            src={profileImage}
            alt={name}
            className="w-32 h-32 object-cover border rounded"
          />
        )}

        <p>活動名：{name}</p>
        <p>ジャンル：{category}</p>
        <p>
          拠点：{prefecture}
          {city && ` ${city}`}
        </p>
      </section>

      {/* 代表作品 */}
      <section className="space-y-2">
        <h3 className="font-semibold">代表作品</h3>

        {works.length === 0 && (
          <p className="text-sm text-gray-500">作品は未登録です</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {works.map((w) => (
            <div key={w.id} className="border p-2 space-y-1">
              {w.images[0] && (
                <img
                  src={w.images[0]}
                  alt={w.title || "作品画像"}
                  className="w-full aspect-square object-cover rounded"
                />
              )}
              <p className="text-sm font-medium">{w.title}</p>
              {w.description && (
                <p className="text-xs text-gray-600">
                  {w.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 活動条件 */}
      <section className="space-y-2">
        <h3 className="font-semibold">活動条件</h3>

        <ul className="text-sm space-y-1">
          <li>依頼制作：{conditions.acceptsCommission ? "可" : "不可"}</li>
          <li>WS対応：{conditions.acceptsWorkshop ? "可" : "不可"}</li>
          <li>展示参加：{conditions.acceptsExhibition ? "可" : "不可"}</li>
          <li>オンライン：{conditions.onlineAvailable ? "可" : "不可"}</li>
        </ul>
      </section>

      {/* 興味・活動ジャンル */}
      <section className="space-y-1">
        <h3 className="font-semibold">興味・活動ジャンル</h3>
        {conditions.activityAreas.length > 0 ? (
          <p className="text-sm">
            {conditions.activityAreas.join(" / ")}
          </p>
        ) : (
          <p className="text-sm text-gray-500">未選択</p>
        )}
      </section>

      {/* 作風・技法 */}
      <section className="space-y-1">
        <h3 className="font-semibold">作風・技法</h3>
        {conditions.styles.length > 0 ? (
          <p className="text-sm">{conditions.styles.join(" / ")}</p>
        ) : (
          <p className="text-sm text-gray-500">未入力</p>
        )}
      </section>

      {/* 検索用タグ */}
      <section className="space-y-1">
        <h3 className="font-semibold">検索用タグ</h3>
        {conditions.tags.length > 0 ? (
          <p className="text-sm">{conditions.tags.join(" / ")}</p>
        ) : (
          <p className="text-sm text-gray-500">未入力</p>
        )}
      </section>

      {/* SNS・リンク */}
      <section className="space-y-1">
        <h3 className="font-semibold">SNS・リンク</h3>
        <p className="text-sm">
          Instagram：{conditions.instagram ?? "未入力"}
        </p>
        <p className="text-sm">
          その他リンク：{conditions.otherLink ?? "未入力"}
        </p>
      </section>

      {/* 備考 */}
      <section className="space-y-1">
        <h3 className="font-semibold">補足・備考</h3>
        <p className="text-sm whitespace-pre-wrap">
          {conditions.note ?? "未入力"}
        </p>
      </section>

      <p className="text-sm text-gray-500">
        ※ 登録後は管理者の承認をもって公開されます
      </p>
    </section>
  );
}