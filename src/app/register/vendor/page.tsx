"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

import StepNav from "@/components/register/StepNav";

import Step1Basic, {
  VendorCategory,
} from "@/components/register/vendor/Step1Basic";
import Step2Menu, {
  VendorMenu,
} from "@/components/register/vendor/Step2Menu";
import Step3Conditions, {
  VendorConditions,
} from "@/components/register/vendor/Step3Conditions";
import Step4Confirm from "@/components/register/vendor/Step4Confirm";

export default function VendorRegisterPage() {
  const [step, setStep] = useState(1);

  /* ======================
   * STEP 1：基本情報
   * ====================== */
  const [name, setName] = useState("");
  const [category, setCategory] = useState<VendorCategory | "">("");
  const [representative, setRepresentative] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [prefecture, setPrefecture] = useState("");
  const [city, setCity] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  /* ======================
   * STEP 2：メニュー
   * ====================== */
  const [menus, setMenus] = useState<VendorMenu[]>([]);

  /* ======================
   * STEP 3：条件
   * ====================== */
  const [conditions, setConditions] = useState<VendorConditions>({
    size: {
      width: null,
      depth: null,
      height: null,
    },
    needsElectricity: false,
    needsWater: false,
    usesFire: false,
    availableDays: [],
    note: null,
  });

  /* ======================
   * 登録処理（★最重要）
   * ====================== */
  const handleSubmit = async () => {
    try {
      const payload = {
        /* --- 基本情報 --- */
        name,
        category,
        representative,
        email,
        phone,
        profileImage,
        prefecture,
        city,

        /* --- メニュー --- */
        menus,

        /* --- 条件（★フラット保存） --- */
        size: conditions.size,
        needsElectricity: conditions.needsElectricity,
        needsWater: conditions.needsWater,
        usesFire: conditions.usesFire,
        availableDays: conditions.availableDays,
        note: conditions.note,

        /* --- 管理用 --- */
        approved: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "vendors"), payload);

      alert("登録が完了しました（承認待ち）");
      setStep(1);
    } catch (e) {
      console.error(e);
      alert("保存に失敗しました");
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">VENDOR 登録</h1>

      <StepNav step={step} total={4} />

      {step === 1 && (
        <Step1Basic
          name={name}
          category={category}
          representative={representative}
          email={email}
          phone={phone}
          prefecture={prefecture}
          city={city}
          profileImage={profileImage}
          onChangeName={setName}
          onChangeCategory={setCategory}
          onChangeRepresentative={setRepresentative}
          onChangeEmail={setEmail}
          onChangePhone={setPhone}
          onChangePrefecture={setPrefecture}
          onChangeCity={setCity}
          onChangeProfileImage={setProfileImage}
        />
      )}

      {step === 2 && (
        <Step2Menu menus={menus} onChange={setMenus} />
      )}

      {step === 3 && (
        <Step3Conditions
          conditions={conditions}
          onChange={setConditions}
        />
      )}

      {step === 4 && (
        <Step4Confirm
          data={{
            name,
            category,
            representative,
            email,
            phone,
            prefecture,
            city,
            profileImage,
            menus,
            conditions,
          }}
        />
      )}

      {/* ナビゲーション */}
      <div className="flex justify-between pt-4">
        {step > 1 && (
          <button
            className="border px-4 py-2"
            onClick={() => setStep(step - 1)}
          >
            戻る
          </button>
        )}

        {step < 4 && (
          <button
            className="bg-black text-white px-6 py-2"
            onClick={() => setStep(step + 1)}
          >
            次へ
          </button>
        )}

        {step === 4 && (
          <button
            className="bg-black text-white px-6 py-2"
            onClick={handleSubmit}
          >
            承認待ちで登録する
          </button>
        )}
      </div>
    </main>
  );
}