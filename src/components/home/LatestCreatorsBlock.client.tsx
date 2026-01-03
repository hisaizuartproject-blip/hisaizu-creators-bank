'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CreatorCard from '@/components/creators/CreatorCard';

type Props = {
  limitCount?: number;
};

export default function LatestCreatorsBlock({ limitCount = 6 }: Props) {
  const [creators, setCreators] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const q = query(
          collection(db, 'creators'),
          where('approved', '==', true),
          limit(limitCount)
        );

        const snap = await getDocs(q);

        setCreators(
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [limitCount]);

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-widest text-slate-700">
          CREATORS
        </h2>
        <a href="/creators" className="text-xs text-slate-500 hover:underline">
          一覧を見る →
        </a>
      </div>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  );
}