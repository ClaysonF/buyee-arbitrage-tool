"use client";

import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  price: number;
  url: string;
};

export default function ListingList() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function loadListings() {
      const response = await fetch("/api/listings");
      const data = await response.json();

      setListings(data);
    }

    loadListings();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Imported Listings
      </h2>

      <div className="space-y-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border p-3 rounded"
          >
            <div className="font-semibold">
              {listing.title}
            </div>

            <div>
              ¥{listing.price.toLocaleString()}
            </div>

            <a
              href={listing.url}
              target="_blank"
              className="text-blue-500"
            >
              View Listing
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}