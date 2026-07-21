"use client";

import { useState } from "react";

import MercariImporter from "@/components/MercariImporter";
import SearchHistory from "@/components/SearchHistory";
import ListingList from "@/components/ListingList";

export default function Home() {
  const [selectedSearchId, setSelectedSearchId] = useState<number | null>(null);

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Buyee Arbitrage Tool
      </h1>

      <MercariImporter />

      <div className="mt-8 flex gap-8 items-start">
        <SearchHistory
          selectedSearchId={selectedSearchId}
          onSelect={setSelectedSearchId}
        />

        <div className="flex-1">
          {selectedSearchId ? (
            <ListingList selectedSearchId={selectedSearchId} />
          ) : (
            <div className="border rounded p-8 text-gray-500">
              Select a search from the left to view its listings.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}