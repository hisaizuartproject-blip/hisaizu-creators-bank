// components/register/common/LocationInput.tsx
"use client";

import { PREFECTURES } from "@/lib/prefectures";

type Props = {
  prefecture: string;
  city: string;
  onChangePrefecture: (v: string) => void;
  onChangeCity: (v: string) => void;
  requiredPrefecture?: boolean;
};

export default function LocationInput({
  prefecture,
  city,
  onChangePrefecture,
  onChangeCity,
  requiredPrefecture = true,
}: Props) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">
          都道府県{requiredPrefecture ? "（必須）" : "（任意）"}
        </label>
        <select
          className="border p-2 w-full rounded"
          value={prefecture}
          onChange={(e) => onChangePrefecture(e.target.value)}
        >
          <option value="">
            {requiredPrefecture ? "選択してください" : "未選択"}
          </option>
          {PREFECTURES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          市区町村（任意）
        </label>
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="例：行田市"
          value={city}
          onChange={(e) => onChangeCity(e.target.value)}
        />
      </div>
    </div>
  );
}