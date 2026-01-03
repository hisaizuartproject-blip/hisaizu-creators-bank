"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

type Upload = {
  id: string;
  downloadURL: string;
  filename: string;
  contentType: string;
};

export default function UploadListPage() {
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/upload/list?uid=${user.uid}`);
      const data = await res.json();

      setUploads(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Uploads</h1>

      {uploads.length === 0 && <p>No uploads yet.</p>}

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {uploads.map((u) => (
          <li key={u.id} className="border p-2 rounded">
            {u.contentType.startsWith("image/") && (
              <Image
                src={u.downloadURL}
                alt={u.filename}
                width={300}
                height={300}
                className="rounded object-cover"
              />
            )}
            <p className="text-sm break-all mt-2">{u.filename}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}