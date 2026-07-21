"use client";

type SearchSession = {
  id: number;
  keyword: string;
  createdAt: string;
  _count: {
    listings: number;
  };
};

type Props = {
  sessions: SearchSession[];
  selectedSearchId: number | null;
  onSelect: (id: number | null) => void;
};

export default function SearchHistory({
  sessions,
  selectedSearchId,
  onSelect,
}: Props) {
  return (
    <div className="border rounded p-4 w-72">
      <h2 className="text-xl font-bold mb-4">
        Search History
      </h2>

      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left p-3 rounded border ${
            selectedSearchId === null
              ? "bg-blue-100 border-blue-500"
              : "hover:bg-gray-100"
          }`}
        >
          <div className="font-semibold">
            All Listings
          </div>
        </button>

        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session.id)}
            className={`w-full text-left p-3 rounded border ${
              selectedSearchId === session.id
                ? "bg-blue-100 border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="font-semibold">
              {session.keyword}
            </div>

            <div className="text-sm text-gray-600">
              {session._count.listings} listings
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}