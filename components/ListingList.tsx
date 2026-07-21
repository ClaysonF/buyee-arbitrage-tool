"use client";

import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  price: number;
  url: string;
  imageUrl: string;
};

type Props = {
  selectedSearchId: number | null;
};

export default function ListingList({
  selectedSearchId,
}: Props) {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function loadListings() {
      const url =
        selectedSearchId === null
          ? "/api/listings"
          : `/api/listings?searchId=${selectedSearchId}`;

      const response = await fetch(url);

      if (!response.ok) {
        console.error("Failed to load listings");
        return;
      }

      const data = await response.json();

      setListings(data);
    }

    loadListings();
  }, [selectedSearchId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Imported Listings
      </h2>

      <div className="space-y-3">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="border rounded p-4 flex gap-4"
          >
            {listing.imageUrl && (
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-32 h-32 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <div className="font-semibold text-lg">
                {listing.title}
              </div>

              <div className="mt-2">
                ¥{listing.price.toLocaleString()}
              </div>

              <div className="mt-4 flex gap-4 flex-wrap">
                <a
                  href={listing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  View Listing
                </a>

                <a
                  href={`https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(
                    listing.title
                  )}&LH_Sold=1&LH_Complete=1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600"
                >
                  View eBay Sold
                </a>

                <a
                  href={`https://translate.google.com/?sl=ja&tl=en&text=${encodeURIComponent(
                    listing.title
                  )}&op=translate`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600"
                >
                  Translate Title
                </a>
              </div>
            </div>
          </div>
        ))}

        {listings.length === 0 && (
          <div className="text-gray-500 border rounded p-6">
            No listings found.
          </div>
        )}
      </div>
    </div>
  );
}