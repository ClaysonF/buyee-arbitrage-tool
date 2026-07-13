"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  estimatedProfit: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">
        Saved Opportunities
      </h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-3 rounded"
          >
            <div className="font-semibold">
              {product.title || "Untitled Product"}
            </div>

            <div>
              Profit: ${product.estimatedProfit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}