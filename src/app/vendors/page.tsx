'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import VendorCard from '@/components/vendors/VendorCard';
import { Vendor } from '@/types/vendor';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const q = query(
          collection(db, 'vendors'),
          where('approved', '==', true)
        );

        const snap = await getDocs(q);

        const list: Vendor[] = snap.docs.map((doc) => {
          const d = doc.data() as any;

          return {
            id: doc.id,
            approved: true,

            name: d.name ?? '',
            category: d.category ?? undefined,
            prefecture: d.prefecture ?? '',
            city: d.city ?? '',
            profileImage: d.profileImage ?? null,
            representative: d.representative ?? '',
            availableDays: Array.isArray(d.availableDays)
              ? d.availableDays
              : [],
            needsElectricity: d.needsElectricity === true,
            needsWater: d.needsWater === true,
            usesFire: d.usesFire === true,
            menus: Array.isArray(d.menus) ? d.menus : [],
          };
        });

        setVendors(list);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <main className="px-10 py-10">
      <h1 className="text-2xl font-bold mb-2">VENDORS</h1>
      <p className="text-gray-600 mb-8">
        出店可能なキッチンカー・事業者一覧
      </p>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      )}
    </main>
  );
}