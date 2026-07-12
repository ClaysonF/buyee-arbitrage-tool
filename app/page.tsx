import ProfitCalculator from "@/components/ProfitCalculator";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">
        Buyee Arbitrage Tool
      </h1>

      <p className="mt-4 text-gray-600">
        Find profitable items to resell.
      </p>

      <ProfitCalculator />
    </main>
  );
}