"use client";

import { useState } from "react";

type Props = {
  label?: string;               // ★ optional に変更
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
};

export default function TagInput({
  label,
  values,
  onChange,
  placeholder = "Enterで追加（例：写真,アクリル,点描）",
}: Props) {
  const [text, setText] = useState("");

  const add = (raw: string) => {
    const v = raw.trim();
    if (!v) return;
    if (values.includes(v)) return;
    onChange([...values, v]);
  };

  const remove = (v: string) =>
    onChange(values.filter((x) => x !== v));

  return (
    <div className="space-y-2">
      {/* ★ label があるときだけ表示 */}
      {label && <div className="font-semibold">{label}</div>}

      <input
        className="border p-2 w-full"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(text);
            setText("");
          }
          if (e.key === "," || e.key === "、") {
            e.preventDefault();
            add(text.replace(/[、,]$/, ""));
            setText("");
          }
        }}
      />

      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span
            key={v}
            className="text-sm bg-gray-200 px-2 py-1 rounded inline-flex gap-2 items-center"
          >
            {v}
            <button
              type="button"
              className="text-xs"
              onClick={() => remove(v)}
              aria-label="remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}