"use client";

import { useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

import Step1Basic, {
  CreatorCategory,
} from "@/components/register/creator/Step1Basic";
import Step2Works, {
  CreatorWork,
} from "@/components/register/creator/Step2Works";
import Step3Conditions, {
  CreatorConditions,
} from "@/components/register/creator/Step3Conditions";
import Step4Confirm from "@/components/register/creator/Step4Confirm";

type CreatorBasicState = {
  name: string;
  category: CreatorCategory | "";
  profileImage: string | null;
  email: string;
  phone: string;
  prefecture: string;
  city: string;
};

export default function CreatorRegisterPage() {
  const [step, setStep] = useState(1);

  /* =====================
   * STEP 1 : 基本情報
   * ===================== */
  const [basic, setBasic] = useState<CreatorBasicState>({
    name: "",
    category: "",
    profileImage: null,
    email: "",
    phone: "",
    prefecture: "",
    city: "",
  });

  const updateBasic = (patch: Partial<CreatorBasicState>) => {
    setBasic((prev) => ({ ...prev, ...patch }));
  };

  /* =====================
   * STEP 2 : 作品
   * ===================== */
  const [works, setWorks] = useState<CreatorWork[]>([]);

  /* =====================
   * STEP 3 : 条件・属性
   * ===================== */
  const [conditions, setConditions] =
    useState<CreatorConditions>({
      acceptsCommission: false,
      acceptsWorkshop: false,
      acceptsExhibition: false,
      onlineAvailable: false,
      activityAreas: [],
      styles: [],
      tags: [],
      instagram: null,
      otherLink: null,
      note: null,
    });

  /* =====================
   * 保存処理（★最重要）
   * ===================== */
  const handleSubmit = async () => {
    try {
      const payload = {
        /* --- 基本情報 --- */
        name: basic.name,
        category: basic.category,
        profileImage: basic.profileImage,
        email: basic.email,
        phone: basic.phone,
        prefecture: basic.prefecture,
        city: basic.city,

        /* --- 作品 --- */
        works,

        /* --- 条件（★フラット保存） --- */
        activityAreas: conditions.activityAreas,
        styles: conditions.styles,
        tags: conditions.tags,
        instagram: conditions.instagram,
        otherLink: conditions.otherLink,
        note: conditions.note,
        onlineAvailable: conditions.onlineAvailable,
        acceptsCommission: conditions.acceptsCommission,
        acceptsWorkshop: conditions.acceptsWorkshop,
        acceptsExhibition: conditions.acceptsExhibition,

        /* --- 管理用 --- */
        approved: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "creators"), payload);

      alert("登録が完了しました（承認待ち）");
      setStep(1);
    } catch (e) {
      console.error(e);
      alert("保存に失敗しました");
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      {step === 1 && (
        <Step1Basic
          name={basic.name}
          category={basic.category}
          profileImage={basic.profileImage}
          email={basic.email}
          phone={basic.phone}
          prefecture={basic.prefecture}
          city={basic.city}
          onChangeName={(v) => updateBasic({ name: v })}
          onChangeCategory={(v) => updateBasic({ category: v })}
          onChangeProfileImage={(v) =>
            updateBasic({ profileImage: v })
          }
          onChangeEmail={(v) => updateBasic({ email: v })}
          onChangePhone={(v) => updateBasic({ phone: v })}
          onChangePrefecture={(v) =>
            updateBasic({ prefecture: v })
          }
          onChangeCity={(v) => updateBasic({ city: v })}
        />
      )}

      {step === 2 && (
        <Step2Works works={works} onChange={setWorks} />
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
            ...basic,
            works,
            conditions,
          }}
        />
      )}

      {/* ナビゲーション */}
      <div className="flex justify-between pt-6">
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
            登録する
          </button>
        )}
      </div>
    </main>
  );
}