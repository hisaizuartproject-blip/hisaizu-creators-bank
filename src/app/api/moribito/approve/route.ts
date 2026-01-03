import { NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

export async function POST(req: Request) {
  const { id, approved, approvedBy } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "id missing" }, { status: 400 });
  }

  await db.collection("moribito").doc(id).update({
    approved,
    approvedAt: approved ? new Date() : null,
    approvedBy: approved ? approvedBy ?? null : null,
  });

  return NextResponse.json({ ok: true });
}