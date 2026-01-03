// src/lib/saveUpload.ts
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type SaveUploadParams = {
  uid: string;
  path: string;
  downloadURL: string;
  filename: string;
  contentType: string;
};

export async function saveUpload(params: SaveUploadParams) {
  await addDoc(collection(db, "uploads"), {
    ...params,
    createdAt: serverTimestamp(),
  });
}