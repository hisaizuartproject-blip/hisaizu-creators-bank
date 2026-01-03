// components/common/SizeInput.tsx
"use client";

type SizeValue = {
  width: number | null;
  depth: number | null;
  height: number | null;
};

type Props = {
  value: SizeValue;
  onChange: (value: SizeValue) => void;
  required?: boolean;
};

export default function SizeInput({
  value,
  onChange,
  required = false,
}: Props) {
  const update = (key: keyof SizeValue, v: string) => {
    const num = v === "" ? null : Number(v);
    onChange({
      ...value,
      [key]: isNaN(Number(num)) ? null : num,
    });
  };

  return (
    <div className="space-y-2">
      <div className="font-semibold">
        設置サイズ（cm）
        {!required && <span className="text-sm text-gray-500">（任意）</span>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-sm mb-1">幅（W）</label>
          <input
            type="number"
            min={0}
            className="border p-2 w-full"
            placeholder="例：180"
            value={value.width ?? ""}
            onChange={(e) => update("width", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">奥行（D）</label>
          <input
            type="number"
            min={0}
            className="border p-2 w-full"
            placeholder="例：240"
            value={value.depth ?? ""}
            onChange={(e) => update("depth", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">高さ（H）</label>
          <input
            type="number"
            min={0}
            className="border p-2 w-full"
            placeholder="例：230"
            value={value.height ?? ""}
            onChange={(e) => update("height", e.target.value)}
          />
        </div>
      </div>

      <p className="text-xs text-gray-500">
        ※ キッチンカー・テント・什器を含めた最大外寸を記入してください
      </p>
    </div>
  );
}