'use client';

import { useEffect, useState } from 'react';
import CreatorCard from '@/components/creators/CreatorCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Creator } from '@/types/creator';

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const q = query(
          collection(db, 'creators'),
          where('approved', '==', true)
        );

        const snapshot = await getDocs(q);

        const list: Creator[] = snapshot.docs.map((doc) => {
          const data = doc.data() as any;

          return {
            id: doc.id,
            approved: true,

            name: data.name ?? '',
            category: data.category ?? undefined,
            prefecture: data.prefecture ?? '',
            city: data.city ?? '',
            profileImage: data.profileImage ?? null,

            activityAreas: Array.isArray(data.activityAreas)
              ? data.activityAreas
              : [],
            styles: Array.isArray(data.styles) ? data.styles : [],
            tags: Array.isArray(data.tags) ? data.tags : [],

            acceptsCommission: data.acceptsCommission === true,
            acceptsWorkshop: data.acceptsWorkshop === true,
            acceptsExhibition: data.acceptsExhibition === true,
            onlineAvailable: data.onlineAvailable === true,

            instagram: data.instagram ?? null,
            otherLink: data.otherLink ?? null,
            note: data.note ?? null,

            works: Array.isArray(data.works) ? data.works : [],
          };
        });

        setCreators(list);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  return (
    <main className="px-10 py-10">
      <h1 className="text-2xl font-bold mb-2">CREATORS</h1>
      <p className="text-gray-600 mb-8">
        行田・埼玉を拠点に活動するクリエイター
      </p>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </main>
  );
}