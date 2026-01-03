// src/app/admin/moribito/page.tsx
import { adminDb } from "@/lib/firebaseAdmin";
import Image from "next/image";
import { revalidatePath } from "next/cache";

const ADMIN_UID = process.env.ADMIN_UID || "system";

type Moribito = {
  id: string;
  name: string;
  image?: string | null;
  prefecture?: string;
  city?: string;
  approved: boolean;
};

export default async function AdminMoribitoPage() {
  const snap = await adminDb
    .collection("moribito")
    .orderBy("createdAt", "desc")
    .get();

  const moribitoList: Moribito[] = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Moribito, "id">),
  }));

  async function toggleApprove(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const approved = formData.get("approved") === "true";

    await adminDb.collection("moribito").doc(id).update({
      approved,
      approvedAt: approved ? new Date() : null,
      approvedBy: approved ? ADMIN_UID : null,
    });

    revalidatePath("/admin/moribito");
  }

  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">MORIBITO 管理</h1>

      <div className="grid gap-4">
        {moribitoList.map((m) => (
          <div
            key={m.id}
            className={`border p-4 flex items-center gap-4 ${
              m.approved ? "bg-white" : "bg-yellow-50"
            }`}
          >
            {m.image && (
              <Image
                src={m.image}
                alt={m.name}
                width={80}
                height={80}
                className="object-cover rounded border"
              />
            )}

            <div className="flex-1">
              <div className="font-semibold text-lg">{m.name}</div>
              {(m.prefecture || m.city) && (
                <div className="text-sm text-gray-600">
                  {m.prefecture}
                  {m.city && ` / ${m.city}`}
                </div>
              )}
            </div>

            <form action={toggleApprove}>
              <input type="hidden" name="id" value={m.id} />
              <input
                type="hidden"
                name="approved"
                value={(!m.approved).toString()}
              />
              <button
                type="submit"
                className={`px-4 py-2 text-sm border ${
                  m.approved ? "bg-white" : "bg-black text-white"
                }`}
              >
                {m.approved ? "承認取消" : "承認する"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}