export default function HomePage() {
  return (
    <section className="py-10 md:py-20">
      <div className="mx-auto max-w-3xl text-center px-4">
        <p className="text-xs tracking-widest text-slate-500 mb-3">
          HISAIZU ART PROJECT
        </p>

        <h1 className="
          text-2xl
          md:text-4xl
          font-semibold
          leading-snug
          md:leading-tight
          text-slate-900
          mb-6
        ">
          HISAIZU CREATORS BANK
        </h1>

        <p className="
          text-sm
          md:text-base
          leading-relaxed
          text-slate-600
          mb-8
        ">
          久伊豆神社を拠点に、ART / CRAFT / SOUND / VENDOR / MORIBITO が交差する
          クリエイターの母艦。作品・音・手仕事・キッチンカーまで、
          まちの「つくる人」をここに集約し、企画と未来につないでいきます。
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            BANKに登録する
          </a>

          <a
            href="/creators"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm text-slate-700 hover:bg-slate-100"
          >
            登録メンバーを見る
          </a>
        </div>
      </div>
    </section>
  );
}