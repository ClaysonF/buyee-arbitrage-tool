"use client";

import { useState } from "react";

export default function ProfitCalculator() {
  const [title, setTitle] = useState("");
  const [buyeeUrl, setBuyeeUrl] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const profit =
    Number(salePrice) -
    Number(buyPrice) -
    Number(shipping);

  async function saveProduct() {
  if (!title.trim()) {
    alert("Title is required");
    return;
  }

  if (!buyPrice || !salePrice) {
    alert("Enter prices");
    return;
  }

  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      buyeeUrl,
      buyPrice: Number(buyPrice),
      shippingCost: Number(shipping),
      expectedSalePrice: Number(salePrice),
      estimatedProfit: profit,
    }),
  });

  if (!response.ok) {
    alert("Failed to save product");
    return;
  }

  alert("Product saved!");

  setTitle("");
  setBuyeeUrl("");
  setBuyPrice("");
  setShipping("");
  setSalePrice("");
}

  return (
    <div className="mt-8 max-w-md space-y-4">
      <input
      className="border p-2 w-full"
      placeholder="Product title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Buyee URL"
        value={buyeeUrl}
        onChange={(e) => setBuyeeUrl(e.target.value)}
      />
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

      <button
        onClick={saveProduct}
        className="bg-black text-white px-4 py-2 rounded">
        Save Product
      </button>
    </div>
  );
}