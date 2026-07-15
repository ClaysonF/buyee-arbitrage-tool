import ProfitCalculator from "@/components/ProfitCalculator";
import ProductList from "@/components/ProductList";
import MercariImporter from "@/components/MercariImporter";
import ListingList from "@/components/ListingList";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">
        Buyee Arbitrage Tool
      </h1>

      <p className="mt-4 text-gray-600">
        Find profitable items to resell.
      </p>

      <MercariImporter />
      <ListingList />

      <ProfitCalculator />
      <ProductList />
    </main>
  );
}