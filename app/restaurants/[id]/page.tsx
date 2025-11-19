"use client";

import { useParams } from "next/navigation";
import { Restaurant } from "@/types";
import { useEffect, useState } from "react";
import ImageWithFallback from "@/components/ImageWithFallback";
import { BookMarkedIcon, Clock3Icon, HeartIcon, MapPinnedIcon, PhoneCallIcon, StarIcon } from "lucide-react";
import { getDealTimeString } from "@/utils";


export default function RestaurantPage() {
  const { id } = useParams<{ id: string }>();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
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

        const restaurant = response.restaurants.find((r: Restaurant) => r.objectId === id);

        setRestaurant(restaurant);
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
  }, [id]);

  if (loading) return <div className="p-4 w-full flex justify-center">Loading…</div>;

  if (error || !restaurant)
    return <div className="p-4 text-red-600 text-sm">{error || "Not found"}</div>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center pb-8 bg-white">
        <div className="absolute top-4 right-4 flex items-center gap-2 p-1 px-2 bg-orange-700 rounded-sm text-white">
        <StarIcon size={12} fill="yellow"/>
          <span className="text-sm font-semibold">New</span>
        </div>
        <div className="flex w-full min-h-48 max-h-96">
          <ImageWithFallback
            src={restaurant.imageLink}
            alt="Restaurant image"
            width={750}
            height={550}
            className="w-full object-cover"
          />
        </div>
        <div className="flex w-full px-8 py-4 justify-between border-b border-gray-200 text-xs text-gray-700">
          <div className="flex flex-col gap-1 items-center">
            <BookMarkedIcon />
            <span>Menu</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <PhoneCallIcon />
            <span>Call us</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <MapPinnedIcon />
            <span>Location</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <HeartIcon />
            <span>Favourite</span>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-center mt-4 mb-2">{restaurant.name}</h1>
        <p className="text-gray-600 text-center">
          {restaurant.cuisines.join(" • ")}
        </p>

        <section className="mt-4 px-4 sm:px-8 w-full flex flex-col gap-2">
          <div className="flex gap-4">
            <Clock3Icon />
            <span>Hours: {restaurant.open} - {restaurant.close}</span>
          </div>
          <div className="flex gap-4">
            <MapPinnedIcon />
            <span>{restaurant.address1} {restaurant.suburb} • 1.0km Away</span>
          </div>
        </section>
        <section className="mt-4 px-4 sm:px-8 w-full flex flex-col gap-2">
          {restaurant.deals.map(deal => (
            <div key={deal.objectId} className="flex justify-between items-center w-full py-2 border-t border-gray-200">
              <div className="flex flex-col">
                <span className="text-2xl text-red-700 font-bold">{deal.lightning && "⚡ "}{deal.discount}% Off</span>
                <span className="text-gray-500">{getDealTimeString(deal)}</span>
                <span className="text-sm text-gray-400">{deal.qtyLeft} Deal{Number(deal.qtyLeft) === 1 ? "" : "s"} Left</span>
              </div>
              <button className="h-fit border-2 border-red-700 rounded-full text-red-700 py-2 px-4">Redeem</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
