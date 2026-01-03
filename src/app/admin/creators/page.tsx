// src/app/admin/creators/page.tsx
import { adminDb } from "@/lib/firebaseAdmin";
import Image from "next/image";
import { revalidatePath } from "next/cache";

const ADMIN_UID = process.env.ADMIN_UID || "system";

type Creator = {
  id: string;
  name: string;
  profileImage: string | null;
  prefecture: string;
  city: string;
  approved: boolean;
};

export default async function AdminCreatorsPage() {
  const snap = await adminDb
    .collection("creators")
    .orderBy("createdAt", "desc")
    .get();

  const creators: Creator[] = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Creator, "id">),
  }));

  async function toggleApprove(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const approved = formData.get("approved") === "true";

    await adminDb.collection("creators").doc(id).update({
      approved,
      approvedAt: approved ? new Date() : null,
      approvedBy: approved ? ADMIN_UID : null,
    });

    revalidatePath("/admin/creators");
  }

  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">CREATOR 管理</h1>

      <div className="grid gap-4">
        {creators.map((c) => (
          <div
            key={c.id}
            className={`border p-4 flex items-center gap-4 ${
              c.approved ? "bg-white" : "bg-yellow-50"
            }`}
          >
            {c.profileImage && (
              <Image
                src={c.profileImage}
                alt={c.name}
                width={80}
                height={80}
                className="object-cover rounded border"
              />
            )}

            <div className="flex-1">
              <div className="font-semibold text-lg">{c.name}</div>
              <div className="text-sm text-gray-600">
                {c.prefecture}
                {c.city && ` / ${c.city}`}
              </div>
            </div>

            <form action={toggleApprove}>
              <input type="hidden" name="id" value={c.id} />
              <input
                type="hidden"
                name="approved"
                value={(!c.approved).toString()}
              />
              <button
                type="submit"
                className={`px-4 py-2 text-sm border ${
                  c.approved ? "bg-white" : "bg-black text-white"
                }`}
              >
                {c.approved ? "承認取消" : "承認する"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}