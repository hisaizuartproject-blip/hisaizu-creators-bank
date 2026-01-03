"use client";

import { useState } from "react";
import { auth, storage, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { saveUpload } from "@/lib/saveUpload";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");

  const login = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const upload = async () => {
    if (!file) return alert("No file");
    if (!auth.currentUser) return alert("Login first");

    const uid = auth.currentUser.uid;
    const path = `uploads/users/${uid}/${Date.now()}_${file.name}`;

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type });

    const downloadURL = await getDownloadURL(storageRef);

    await saveUpload({
      uid,
      path,
      downloadURL,
      filename: file.name,
      contentType: file.type,
    });

    setUrl(downloadURL);
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={login}>Login</button><br /><br />
      <input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <br /><br />
      <button onClick={upload}>Upload</button>
      {url && <img src={url} width={200} />}
    </div>
  );
}