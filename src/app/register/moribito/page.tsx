"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PREFECTURES } from "@/lib/prefectures";

const INTEREST_OPTIONS = [
  "アート・デザイン",
  "クラフト・ものづくり",
  "地域・まちづくり",
  "教育・子ども",
  "文化・神社・歴史",
];

const ROLE_OPTIONS = [
  "イベントや展示の運営を手伝いたい（受付・設営など）",
  "ワークショップや体験企画に関わりたい",
  "地域や神社の活動を継続的に見守りたい",
  "情報発信や広報で関われそう",
  "まずは様子を見ながら関わりたい",
];

export default function RegisterMoribitoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");

  const [interests, setInterests] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (
    v: string,
    arr: string[],
    setArr: (a: string[]) => void
  ) => {
    setArr(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  };

  const canSubmit =
    name && email && prefecture && city && interests.length && roles.length;

  const submit = async () => {
    if (!canSubmit) {
      alert("必須項目を入力してください");
      return;
    }
    setSaving(true);
    await addDoc(collection(db, "moribito"), {
      name,
      contactEmail: email,
      location: {
        prefecture,
        city,
      },
      interests,
      roles,
      note: note || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setDone(true);
    setSaving(false);
  };

  if (done) {
    return (
      <main className="p-8 max-w-2xl mx-auto space-y-4">
        <h2 className="text-xl font-bold">登録ありがとうございます</h2>
        <p>
          MORIBITOとしてのご登録を受け付けました。<br />
          今後の活動情報をお届けします。
        </p>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">MORIBITO 登録（支援者）</h1>

      <p className="text-sm leading-relaxed">
        久伊豆神社を起点とした HISAIZU の活動を、<br />
        さまざまな形で「見守り・支える」ための登録です。<br />
        ※ 登録内容が公開されることはありません。
      </p>

      <section className="border p-4 space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="お名前（必須）"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          className="border p-2 w-full"
          placeholder="連絡先メール（必須）"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={prefecture}
          onChange={e => setPrefecture(e.target.value)}
        >
          <option value="">都道府県（必須）</option>
          {PREFECTURES.map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <input
          className="border p-2 w-full"
          placeholder="市区町村（必須）"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <div>
          <div className="font-semibold mb-1">
            興味のあるジャンル（必須・複数可）
          </div>
          {INTEREST_OPTIONS.map(v => (
            <label key={v} className="block">
              <input
                type="checkbox"
                checked={interests.includes(v)}
                onChange={() =>
                  toggle(v, interests, setInterests)
                }
              />{" "}
              {v}
            </label>
          ))}
        </div>

        <div>
          <div className="font-semibold mb-1">
            関わりたい立場（必須・複数可）
          </div>
          {ROLE_OPTIONS.map(v => (
            <label key={v} className="block">
              <input
                type="checkbox"
                checked={roles.includes(v)}
                onChange={() => toggle(v, roles, setRoles)}
              />{" "}
              {v}
            </label>
          ))}
        </div>

        <textarea
          className="border p-2 w-full"
          rows={3}
          placeholder="自由記述（任意）"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={saving}
          className="bg-black text-white px-4 py-2"
        >
          {saving ? "送信中…" : "登録する"}
        </button>
      </section>
    </main>
  );
}