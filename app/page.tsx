"use client";

import { useEffect, useState } from "react";

import MercariImporter from "@/components/MercariImporter";
import SearchHistory from "@/components/SearchHistory";
import ListingList from "@/components/ListingList";

type SearchSession = {
  id: number;
  keyword: string;
  createdAt: string;
  _count: {
    listings: number;
  };
};

export default function Home() {
  const [selectedSearchId, setSelectedSearchId] =
    useState<number | null>(null);

  const [sessions, setSessions] = useState<SearchSession[]>([]);

  useEffect(() => {
    async function loadSessions() {
      const response = await fetch("/api/search-sessions");

      if (!response.ok) {
        console.error("Failed to load search sessions");
        return;
      }

      const data = await response.json();
      setSessions(data);
    }

    loadSessions();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Buyee Arbitrage Tool
      </h1>

      <MercariImporter />

      <div className="mt-8 flex gap-8 items-start">
        <SearchHistory
          sessions={sessions}
          selectedSearchId={selectedSearchId}
          onSelect={setSelectedSearchId}
        />

        <div className="flex-1">
          <ListingList
            selectedSearchId={selectedSearchId}
          />
        </div>
      </div>
    </main>
  );
}