import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

type UploadOwnerType = "creator" | "vendor";

export async function uploadFileAndSaveMeta(params: {
  file: File;
  ownerType: UploadOwnerType;
  ownerId?: string; // 登録前は未確定なので optional
}): Promise<{ url: string; uploadId: string }> {
  const { file, ownerType, ownerId } = params;

  const ext = file.name.split(".").pop() || "bin";
  const path = `uploads/${ownerType}/${ownerId ?? "temp"}/${crypto.randomUUID()}.${ext}`;

  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  const uploadDoc = await addDoc(collection(db, "uploads"), {
    url,
    fileType: file.type.startsWith("video") ? "video" : "image",
    ownerType,
    ownerId: ownerId ?? null,
    createdAt: serverTimestamp(),
  });

  return { url, uploadId: uploadDoc.id };
}