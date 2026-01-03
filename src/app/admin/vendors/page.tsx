// src/app/admin/vendors/page.tsx
import { adminDb } from "@/lib/firebaseAdmin";
import Image from "next/image";
import { revalidatePath } from "next/cache";

const ADMIN_UID = process.env.ADMIN_UID || "system";

type Vendor = {
  id: string;
  name: string;
  image?: string | null;
  prefecture?: string;
  city?: string;
  approved: boolean;
};

export default async function AdminVendorsPage() {
  const snap = await adminDb
    .collection("vendors")
    .orderBy("createdAt", "desc")
    .get();

  const vendors: Vendor[] = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Vendor, "id">),
  }));

  async function toggleApprove(formData: FormData) {
    "use server";

    const id = formData.get("id") as string;
    const approved = formData.get("approved") === "true";

    await adminDb.collection("vendors").doc(id).update({
      approved,
      approvedAt: approved ? new Date() : null,
      approvedBy: approved ? ADMIN_UID : null,
    });

    revalidatePath("/admin/vendors");
  }

  return (
    <main className="max-w-6xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">VENDOR 管理</h1>

      <div className="grid gap-4">
        {vendors.map((v) => (
          <div
            key={v.id}
            className={`border p-4 flex items-center gap-4 ${
              v.approved ? "bg-white" : "bg-yellow-50"
            }`}
          >
            {v.image && (
              <Image
                src={v.image}
                alt={v.name}
                width={80}
                height={80}
                className="object-cover rounded border"
              />
            )}

            <div className="flex-1">
              <div className="font-semibold text-lg">{v.name}</div>
              {(v.prefecture || v.city) && (
                <div className="text-sm text-gray-600">
                  {v.prefecture}
                  {v.city && ` / ${v.city}`}
                </div>
              )}
            </div>

            <form action={toggleApprove}>
              <input type="hidden" name="id" value={v.id} />
              <input
                type="hidden"
                name="approved"
                value={(!v.approved).toString()}
              />
              <button
                type="submit"
                className={`px-4 py-2 text-sm border ${
                  v.approved ? "bg-white" : "bg-black text-white"
                }`}
              >
                {v.approved ? "承認取消" : "承認する"}
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}