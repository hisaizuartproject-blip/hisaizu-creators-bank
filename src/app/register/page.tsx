import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="px-6 py-16 max-w-3xl mx-auto">
      {/* ヘッダー */}
      <div className="mb-10 text-center">
        <p className="text-xs tracking-widest text-slate-500 mb-2">
          HISAIZU CREATORS BANK
        </p>
        <h1 className="text-3xl font-bold tracking-tight mb-3">
          BANKに参加する
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          HISAIZU CREATORS BANK は、<br />
          「つくる人」「支える人」「届ける人」が集まる母艦です。<br />
          あなたの関わり方を選んでください。
        </p>
      </div>

      {/* 選択カード */}
      <div className="space-y-4">
        {/* CREATOR */}
        <Link
          href="/register/creator"
          className="group block rounded-xl border bg-white p-6 transition
                     hover:shadow-md hover:-translate-y-[2px]"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                CREATOR
              </h2>
              <p className="text-sm text-slate-600">
                制作・表現者
              </p>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                ART / CRAFT / SOUND など、<br />
                作品や表現活動を行う人はこちら。
              </p>
            </div>
            <span className="text-sm text-slate-400 group-hover:text-slate-700">
              →
            </span>
          </div>
        </Link>

        {/* VENDOR */}
        <Link
          href="/register/vendor"
          className="group block rounded-xl border bg-white p-6 transition
                     hover:shadow-md hover:-translate-y-[2px]"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                VENDOR
              </h2>
              <p className="text-sm text-slate-600">
                出店者・事業者
              </p>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                キッチンカー・物販・サービスなど、<br />
                イベントや企画に参加する事業者向け。
              </p>
            </div>
            <span className="text-sm text-slate-400 group-hover:text-slate-700">
              →
            </span>
          </div>
        </Link>

        {/* MORIBITO */}
        <Link
          href="/register/moribito"
          className="group block rounded-xl border bg-white p-6 transition
                     hover:shadow-md hover:-translate-y-[2px]"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-1">
                MORIBITO
              </h2>
              <p className="text-sm text-slate-600">
                支援者・伴走者
              </p>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                企画支援・運営協力・資源提供など、<br />
                プロジェクトを支える立場の方はこちら。
              </p>
            </div>
            <span className="text-sm text-slate-400 group-hover:text-slate-700">
              →
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}