// components/register/StepNav.tsx
"use client";

type Props = {
  step: number;
  total?: number; // default 4
  labels?: string[]; // optional: ["基本情報","提供内容","条件","確認"] など
};

export default function StepNav({ step, total = 4, labels }: Props) {
  return (
    <div className="flex flex-wrap gap-2 text-sm">
      {Array.from({ length: total }).map((_, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <span
            key={n}
            className={[
              "px-3 py-1 border rounded",
              active ? "bg-gray-100 border-gray-400" : "",
              done ? "opacity-70" : "",
            ].join(" ")}
            aria-current={active ? "step" : undefined}
          >
            STEP {n}
            {labels?.[i] ? (
              <span className="ml-2 text-xs text-gray-600">{labels[i]}</span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}