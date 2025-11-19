"use client";

import { useEffect, useState } from "react";

import RestaurantCard from "@/components/RestaurantCard";
import { Restaurant } from "@/types";
import { SearchIcon } from "lucide-react";

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center pb-8 px-2 bg-white dark:bg-black sm:items-center">
        <div className="flex items-center w-full gap-2 border-b border-gray-200 mb-4">
          <SearchIcon size={16} />
          <input type="text" className="w-full py-2" placeholder="e.g. chinese, pizza" />
        </div>

        {!loading && error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid w-full gap-12 text-center sm:text-left sm:grid-cols-2">
            {restaurants.map(restaurant =>
              <RestaurantCard key={restaurant.objectId} restaurant={restaurant} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
