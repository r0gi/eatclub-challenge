"use client";

import { useEffect, useState } from "react";

import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant } from "@/types";
import { SearchIcon } from "lucide-react";
import { getBestDeal } from "@/utils";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api");

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const response = await res.json();

        setRestaurants(response.restaurants);
      } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Failed to load schedule.");
      }
    } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filter by name
  const filteredRestaurants = restaurants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase().trim()) ||
    r.cuisines.some(cuisine => cuisine.toLowerCase().includes(search.toLowerCase().trim()))
  );

  // sort restaurants by best deals first
  filteredRestaurants.sort((a, b) =>
    Number(getBestDeal(b.deals)?.discount ?? 0) - Number(getBestDeal(a.deals)?.discount ?? 0)
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center pb-8 px-2 bg-white sm:items-center">
        <div className="flex items-center w-full gap-2 border-b border-gray-200 mb-4">
          <SearchIcon size={16} />
          <input
            type="text"
            className="w-full py-2"
            placeholder="e.g. chinese, pizza"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!loading && error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid w-full gap-12 text-center sm:text-left sm:grid-cols-2">
            {filteredRestaurants.map(restaurant =>
              <RestaurantCard key={restaurant.objectId} restaurant={restaurant} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
