// src/app/projects/page.tsx

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 space-y-16">
      {/* ヘッダー */}
      <section className="space-y-4">
        <p className="text-xs tracking-[0.3em] text-slate-500 font-semibold">
          PROJECTS
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          HISAIZU PROJECTS
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 max-w-3xl">
          HISAIZU CREATORS BANK を起点に展開される、
          アート・ものづくり・実験的な取り組みの記録と構想です。
        </p>
      </section>

      {/* 概要 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">
          このページについて
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          PROJECTS ページは、完成した実績を並べるためのページではありません。
          現在進行中の試みや、これから立ち上がる構想も含めて、
          HISAIZU の活動全体を俯瞰できる場所として設計されています。
        </p>
      </section>

      {/* 仮プロジェクト一覧 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">
          現在の主なプロジェクト
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold mb-2">
              HISAIZU ART PROJECT
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              久伊豆神社を拠点としたアートプロジェクト。
              展示、ワークショップ、パブリックアートなどを通じて、
              創作と場の関係性を探ります。
            </p>
            <p className="mt-3 text-[11px] text-slate-400">
              ※ 詳細ページ準備中
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold mb-2">
              HISAIZU MONO PROJECT
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              ものづくりを通じた実験的プロジェクト。
              素材、技術、流通、表現の可能性を横断的に検証します。
            </p>
            <p className="mt-3 text-[11px] text-slate-400">
              ※ 詳細ページ準備中
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold mb-2">
              GARAKUTA
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              廃材・不要物・使われなくなったものに新たな価値を与える
              アップサイクル／再編集プロジェクト。
            </p>
            <p className="mt-3 text-[11px] text-slate-400">
              ※ 展開方法検討中
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold mb-2">
              and more...
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              今後、CREATORS BANK に登録された人や実践を起点に、
              新たなプロジェクトが立ち上がっていきます。
            </p>
          </div>
        </div>
      </section>

      {/* 予告 */}
      <section className="border-t border-slate-200 pt-8">
        <p className="text-xs text-slate-500 leading-relaxed">
          各プロジェクトの詳細ページ、記録、参加方法などは
          準備が整い次第、順次公開予定です。
        </p>
      </section>
    </main>
  );
}