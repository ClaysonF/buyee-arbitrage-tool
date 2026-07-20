"use client";

import { useEffect, useState } from "react";

type Listing = {
  id: number;
  title: string;
  price: number;
  url: string;
  imageUrl: string;
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
            {listing.imageUrl !== "" && (
              <img
                src={listing.imageUrl}
                alt={listing.title}
                className="w-32 h-32 object-cover rounded mb-3"
              />
            )}
            <div className="font-semibold">
              {listing.title}
            </div>

            <div>
              ¥{listing.price.toLocaleString()}
            </div>

            <div className="mt-2 flex gap-4">
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
        ))}
      </div>
    </div>
  );
}