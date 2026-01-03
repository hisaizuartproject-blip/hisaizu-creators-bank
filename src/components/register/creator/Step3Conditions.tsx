// components/register/creator/Step3Conditions.tsx
"use client";

import TagInput from "@/components/forms/TagInput";

export type CreatorConditions = {
  acceptsCommission: boolean;
  acceptsWorkshop: boolean;
  acceptsExhibition: boolean;
  onlineAvailable: boolean;

  activityAreas: string[];   // 興味・活動ジャンル
  styles: string[];          // 作風・技法
  tags: string[];            // 検索用タグ

  instagram: string | null;
  otherLink: string | null;

  note: string | null;
};

type Props = {
  conditions: CreatorConditions;
  onChange: (conditions: CreatorConditions) => void;
};

const INTEREST_OPTIONS = [
  "アート・デザイン",
  "クラフト・ものづくり",
  "地域・まちづくり",
  "教育・子ども",
  "文化・神社・歴史",
];

export default function Step3Conditions({
  conditions,
  onChange,
}: Props) {
  const update = (patch: Partial<CreatorConditions>) => {
    onChange({ ...conditions, ...patch });
  };

  const toggleArea = (area: string) => {
    update({
      activityAreas: conditions.activityAreas.includes(area)
        ? conditions.activityAreas.filter((a) => a !== area)
        : [...conditions.activityAreas, area],
    });
  };

  return (
    <section className="border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold">活動条件・属性</h2>
        <p className="text-sm text-gray-500">
          マッチング・検索・企画判断に使用されます
        </p>
      </div>

      {/* 対応可否 */}
      <div className="space-y-2">
        <h3 className="font-semibold">対応可否</h3>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={conditions.acceptsCommission}
            onChange={(e) =>
              update({ acceptsCommission: e.target.checked })
            }
          />
          依頼制作を受けられる
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={conditions.acceptsWorkshop}
            onChange={(e) =>
              update({ acceptsWorkshop: e.target.checked })
            }
          />
          ワークショップ対応可
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={conditions.acceptsExhibition}
            onChange={(e) =>
              update({ acceptsExhibition: e.target.checked })
            }
          />
          展示・企画参加可
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={conditions.onlineAvailable}
            onChange={(e) =>
              update({ onlineAvailable: e.target.checked })
            }
          />
          オンライン対応可
        </label>
      </div>

      {/* 活動ジャンル */}
      <div className="space-y-2">
        <h3 className="font-semibold">興味・活動ジャンル</h3>

        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((area) => (
            <button
              key={area}
              type="button"
              onClick={() => toggleArea(area)}
              className={`px-3 py-1 border text-sm rounded ${
                conditions.activityAreas.includes(area)
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* 作風・技法 */}
      <div className="space-y-2">
        <h3 className="font-semibold">作風・技法</h3>
        <TagInput
          values={conditions.styles}
          onChange={(v) => update({ styles: v })}
          placeholder="例：アクリル、モノクロ、立体"
        />
      </div>

      {/* タグ */}
      <div className="space-y-2">
        <h3 className="font-semibold">検索用タグ</h3>
        <TagInput
          values={conditions.tags}
          onChange={(v) => update({ tags: v })}
          placeholder="例：行田市、ワークショップ、神社"
        />
      </div>

      {/* SNS */}
      <div className="space-y-3">
        <h3 className="font-semibold">SNS・リンク</h3>

        <input
          className="border p-2 w-full"
          placeholder="Instagram（任意）"
          value={conditions.instagram ?? ""}
          onChange={(e) =>
            update({
              instagram: e.target.value || null,
            })
          }
        />

        <input
          className="border p-2 w-full"
          placeholder="その他リンク（Webサイト等・任意）"
          value={conditions.otherLink ?? ""}
          onChange={(e) =>
            update({
              otherLink: e.target.value || null,
            })
          }
        />
      </div>

      {/* 備考 */}
      <div className="space-y-1">
        <h3 className="font-semibold">補足・備考</h3>
        <textarea
          rows={3}
          className="border p-2 w-full"
          value={conditions.note ?? ""}
          onChange={(e) =>
            update({
              note: e.target.value || null,
            })
          }
        />
      </div>
    </section>
  );
}