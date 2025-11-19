import { Deal } from "@/types";

export function getBestDeal(deals: Deal[]) {
  if (deals.length === 0) return null;

  return deals.reduce((a, b) =>
    Number(b.discount) > Number(a.discount) ? b : a
  );
}

export function getDealTimeString(deal: Deal) {
  if (deal.open && deal.close) {
    return `Between ${deal.open} - ${deal.close}`;
  } else if (deal.start && deal.end){
    return `Between ${deal.start} - ${deal.end}`
  } else {
    return "Anytime today";
  }
}
