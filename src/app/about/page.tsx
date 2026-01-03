// src/app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 space-y-16">
      {/* ヒーロー */}
      <section className="space-y-4">
        <p className="text-xs tracking-[0.3em] text-slate-500 font-semibold">
          ABOUT
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          HISAIZU CREATORS BANK とは
        </h1>
        <p className="text-sm leading-relaxed text-slate-600 max-w-3xl">
          HISAIZU CREATORS BANK は、久伊豆神社を拠点に、
          ART / CRAFT / SOUND / VENDOR など多様な「つくる人」が
          ゆるやかにつながり、実践を通じて関係性を育てていく
          クリエイターの母艦です。
        </p>
      </section>

      {/* WHY */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">
          なぜ、CREATORS BANK をつくるのか
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          多くの創作活動は、個人の努力や偶然の出会いに依存しています。
          しかし本来、創作はもっと「場」と「関係性」に支えられるべきものです。
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          HISAIZU CREATORS BANK は、作品を売るためのマーケットでも、
          フォロワーを増やすためのSNSでもありません。
          創作が継続し、発展し、社会と接続されていくための
          「母艦」として機能することを目的としています。
        </p>
      </section>

      {/* BANK の定義 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">
          「BANK」という考え方
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          この BANK は、金銭を預ける場所ではありません。
          人・技術・思想・問い・実践の履歴が蓄積され、
          必要なときに引き出され、次の活動につながっていく
          共有の基盤です。
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          登録されることで、すぐに仕事が発生するわけではありません。
          しかし、BANK に蓄積された存在と活動は、
          イベント・企画・協働の際に確実に参照される資産になります。
        </p>
      </section>

      {/* 役割 */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">
          登録できる役割
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold mb-2">CREATOR</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              制作・表現を行う人。
              アート、クラフト、音楽、デザインなど、
              分野や完成度は問いません。
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold mb-2">VENDOR</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              出店・提供を行う人。
              キッチンカーや物販、飲食など、
              イベントを支える実践者です。
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold mb-2">MORIBITO</h3>
            <p className="text-xs leading-relaxed text-slate-600">
              支え、見守り、つなぐ人。
              運営・記録・調整・支援など、
             場を成立させる重要な存在です。
            </p>
          </div>
        </div>
      </section>

      {/* HISAIZU との関係 */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">
          久伊豆神社と HISAIZU PROJECT
        </h2>
        <p className="text-sm leading-relaxed text-slate-600">
          HISAIZU CREATORS BANK は、
          久伊豆神社を起点とする HISAIZU ART PROJECT /
          HISAIZU MONO PROJECT の一環として運営されています。
        </p>
        <p className="text-sm leading-relaxed text-slate-600">
          神社という「時間の蓄積された場所」を背景に、
          一過性ではない創作と関係性を育てていくことを目指しています。
        </p>
      </section>

      {/* フッター的メッセージ */}
      <section className="border-t border-slate-200 pt-8">
        <p className="text-xs text-slate-500 leading-relaxed">
          HISAIZU CREATORS BANK は、完成された答えを提示する場ではありません。
          それぞれの実践と問いが持ち寄られ、
          次の動きが自然に生まれていくための土台です。
        </p>
      </section>
    </main>
  );
}