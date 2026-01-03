// src/app/page.tsx
import LatestCreatorsBlock from "@/components/home/LatestCreatorsBlock.client";
import LatestVendorsBlock from "@/components/home/LatestVendorsBlock.client";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* ヒーロー */}
      <section className="mb-10 grid gap-8 md:grid-cols-[2fr,1.2fr]">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-slate-500">
            HISAIZU ART PROJECT
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            HISAIZU CREATORS BANK
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            久伊豆神社を拠点に、「ART / CRAFT / SOUND / VENDOR / MORIBITO」が交差する
            クリエイターの母艦です。作品・音・手仕事・キッチンカーまで、
            まちの“つくる人”をここに集約し、イベントや企画とつないでいきます。
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <a
              href="/register"
              className="rounded-full bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
            >
              BANKに登録する
            </a>

            <a
              href="/creators"
              className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              登録メンバーを見る
            </a>
          </div>
        </div>

        {/* 右側：概要カード */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
          <h2 className="mb-3 text-sm font-semibold text-slate-800">
            このサイトでできること
          </h2>

          <ul className="space-y-2">
            <li>・ART / CRAFT / SOUND / VENDOR / MORIBITO の登録</li>
            <li>・HISAIZU 関連イベントへの出店・出演・協力候補のリスト化</li>
            <li>・主催側からの仕事・コラボレーション相談の窓口</li>
            <li>・将来的にはマイページ／活動履歴／作品アーカイブへ拡張</li>
          </ul>

          <p className="mt-3 text-[11px] text-slate-500">
            ※ 登録内容は運営側で確認のうえ、承認されたものが公式サイトに掲載されます。
          </p>
        </div>
      </section>

      {/* ⭐ Homeの目玉：最新ブロック */}
      <section className="space-y-12">
        <LatestCreatorsBlock limitCount={6} />
        <LatestVendorsBlock limitCount={6} />
      </section>

      {/* 今後：PROJECTS / EVENTS への導線 */}
      <section className="mt-10 text-xs text-slate-500">
        <p>
          HISAIZU ART PROJECT / HISAIZU MONO PROJECT / GARAKUTA などの詳細は、
          順次「PROJECTS」ページで公開していきます。
        </p>
      </section>
    </div>
  );
}