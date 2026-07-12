"use client";

import { useState } from "react";

export default function ProfitCalculator() {
  const [buyPrice, setBuyPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const profit =
    Number(salePrice) -
    Number(buyPrice) -
    Number(shipping);

  return (
    <div className="mt-8 max-w-md space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="Buyee price"
        value={buyPrice}
        onChange={(e) => setBuyPrice(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Shipping cost"
        value={shipping}
        onChange={(e) => setShipping(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Expected eBay sale price"
        value={salePrice}
        onChange={(e) => setSalePrice(e.target.value)}
      />

      <div className="text-xl font-bold">
        Estimated Profit: ${profit || 0}
      </div>
    </div>
  );
}