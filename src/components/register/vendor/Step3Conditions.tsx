// components/register/vendor/Step3Conditions.tsx
"use client";

import type { ComponentProps } from "react";
import SizeInput from "@/components/common/SizeInput";

type SizeValue = ComponentProps<typeof SizeInput>["value"];

export type VendorConditions = {
  size: SizeValue;
  needsElectricity: boolean;
  needsWater: boolean;
  usesFire: boolean;
  availableDays: ("平日" | "土日" | "祝日")[];
  note: string | null;
};

type Props = {
  conditions: VendorConditions;
  onChange: (conditions: VendorConditions) => void;
};

export default function Step3Conditions({ conditions, onChange }: Props) {
  const update = (patch: Partial<VendorConditions>) => {
    onChange({ ...conditions, ...patch });
  };

  const toggleDay = (day: VendorConditions["availableDays"][number]) => {
    update({
      availableDays: conditions.availableDays.includes(day)
        ? conditions.availableDays.filter((d) => d !== day)
        : [...conditions.availableDays, day],
    });
  };

  return (
    <section className="border p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold">出店条件</h2>
        <p className="text-sm text-gray-500">
          神社内配置やイベント調整のため、できるだけ正確に入力してください
        </p>
      </div>

      {/* サイズ */}
      <div className="space-y-2">
        <label className="font-semibold block">使用サイズ（必須）</label>

        <SizeInput
          value={conditions.size}
          onChange={(size) => update({ size })}
        />

        <p className="text-xs text-gray-500">
          単位：cm（例：幅200 × 奥行300 × 高さ250）
        </p>
      </div>

      {/* 設備条件 */}
      <div className="space-y-2">
        <label className="font-semibold block">設備条件</label>

        <label className="block">
          <input
            type="checkbox"
            checked={conditions.needsElectricity}
            onChange={(e) => update({ needsElectricity: e.target.checked })}
          />{" "}
          電源を使用する
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={conditions.needsWater}
            onChange={(e) => update({ needsWater: e.target.checked })}
          />{" "}
          水道を使用する
        </label>

        <label className="block">
          <input
            type="checkbox"
            checked={conditions.usesFire}
            onChange={(e) => update({ usesFire: e.target.checked })}
          />{" "}
          火気を使用する
        </label>
      </div>

      {/* 対応可能日 */}
      <div className="space-y-2">
        <label className="font-semibold block">対応可能日</label>

        {(["平日", "土日", "祝日"] as const).map((day) => (
          <label key={day} className="block">
            <input
              type="checkbox"
              checked={conditions.availableDays.includes(day)}
              onChange={() => toggleDay(day)}
            />{" "}
            {day}
          </label>
        ))}
      </div>

      {/* 補足 */}
      <div className="space-y-2">
        <label className="font-semibold block">補足・条件（任意）</label>

        <textarea
          className="border p-2 w-full"
          rows={3}
          placeholder="設営条件や注意点があれば記載してください"
          value={conditions.note ?? ""}
          onChange={(e) => update({ note: e.target.value || null })}
        />
      </div>
    </section>
  );
}