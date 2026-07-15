"use client";

import { useState } from "react";

export default function MercariImporter() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  async function importListings() {
    if (!keyword.trim()) {
      alert("Enter a keyword");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/import-mercari", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword,
      }),
    });

    const data = await response.json();

    setLoading(false);

    alert(`Imported ${data.imported} listings`);

    window.location.reload();
  }

  return (
    <div className="mt-10 border p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">
        Import Mercari Listings
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Nintendo 64"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        onClick={importListings}
        disabled={loading}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Importing..." : "Import Listings"}
      </button>
    </div>
  );
}