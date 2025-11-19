import { Restaurant } from "@/types";
import { HeartIcon } from "lucide-react";
import ImageWithFallback from "./ImageWithFallback";

interface RestaurantCardProps {
    restaurant: Restaurant;
}

export default function RestaurantCard(props: RestaurantCardProps) {
  const { restaurant } = props;
  const { name, suburb, cuisines, imageLink, deals } = restaurant;

  const dineIn = deals.some(deal => deal.dineIn === "true");
  // TODO: logic for Takeaway and Order Online

  // TODO: filter out for active deals based on device time and deal `open` and `close`
  const bestDeal = restaurant.deals.reduce((a, b) =>
    Number(b.discount) > Number(a.discount) ? b : a
  );

  return (
    <div className="relative flex flex-col w-full items-start gap-1">
      <div className="absolute top-2 left-2 flex flex-col items-start p-1 bg-orange-700 rounded-sm text-white">
        <span className="text-sm font-semibold">{bestDeal?.discount}% off {bestDeal.dineIn && " - Dine In"}</span>
        <span className="text-[0.6rem]">Anytime today</span>
      </div>
      <div className="flex w-full h-32 mb-2">
        <ImageWithFallback
          src={imageLink}
          alt="Restaurant image"
          width={750}
          height={550}
          className="w-full object-cover rounded-sm"
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <h3 className="font-bold">{name}</h3>
        <HeartIcon className="stroke-gray-500" />
      </div>
      <span className="text-sm text-gray-600">0.5km Away, {suburb}</span>
      <span className="text-[0.7rem] text-gray-600">{cuisines.join(", ")}</span>
      {dineIn && <span className="text-xs text-gray-600">Dine In &bull; Takeaway &bull; Order Online</span>}
    </div>
  );
}
