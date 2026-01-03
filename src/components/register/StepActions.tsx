// components/register/StepActions.tsx
"use client";

type Props = {
  step: number;
  total?: number; // default 4
  canNext?: boolean;
  canSubmit?: boolean;
  saving?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
};

export default function StepActions({
  step,
  total = 4,
  canNext = true,
  canSubmit = true,
  saving = false,
  onPrev,
  onNext,
  onSubmit,
}: Props) {
  const isLast = step === total;

  return (
    <div className="flex justify-between items-center pt-4">
      <div>
        {step > 1 && (
          <button
            type="button"
            onClick={onPrev}
            className="border px-4 py-2 rounded hover:bg-gray-50"
          >
            戻る
          </button>
        )}
      </div>

      <div>
        {!isLast && (
          <button
            type="button"
            disabled={!canNext}
            onClick={onNext}
            className={`px-4 py-2 rounded text-white ${
              canNext ? "bg-black" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            次へ
          </button>
        )}

        {isLast && (
          <button
            type="button"
            disabled={!canSubmit || saving}
            onClick={onSubmit}
            className={`px-6 py-2 rounded text-white ${
              !canSubmit || saving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black"
            }`}
          >
            {saving ? "送信中…" : "この内容で登録する"}
          </button>
        )}
      </div>
    </div>
  );
}