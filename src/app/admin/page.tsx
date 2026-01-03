import { adminDb } from "@/lib/firebaseAdmin";
import Link from "next/link";

async function countUnapproved(col: string) {
  const snap = await adminDb
    .collection(col)
    .where("approved", "==", false)
    .get();
  return snap.size;
}

export default async function AdminDashboardPage() {
  const [creators, vendors, moribito] = await Promise.all([
    countUnapproved("creators"),
    countUnapproved("vendors"),
    countUnapproved("moribito"),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold">管理ダッシュボード</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/creators" className="border p-6 block">
          <div className="text-sm">CREATORS</div>
          <div className="text-3xl font-bold text-orange-600">
            {creators}
          </div>
          <div className="text-xs">未承認</div>
        </Link>

        <Link href="/admin/vendors" className="border p-6 block">
          <div className="text-sm">VENDORS</div>
          <div className="text-3xl font-bold text-orange-600">
            {vendors}
          </div>
          <div className="text-xs">未承認</div>
        </Link>

        <Link href="/admin/moribito" className="border p-6 block">
          <div className="text-sm">MORIBITO</div>
          <div className="text-3xl font-bold text-orange-600">
            {moribito}
          </div>
          <div className="text-xs">未承認</div>
        </Link>
      </div>
    </main>
  );
}