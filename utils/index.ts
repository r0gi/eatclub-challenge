import { Deal } from "@/types";

export function getBestDeal(deals: Deal[]) {
  if (deals.length === 0) return null;

  return deals.reduce((a, b) =>
    Number(b.discount) > Number(a.discount) ? b : a
  );
}
