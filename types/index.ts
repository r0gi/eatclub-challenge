export type Deal = {
  objectId: string;
  discount: string;     // NOTE: seems to be percentage but represented as string
  dineIn: string;       // "true" | "false"
  lightning: string;    // "true" | "false"
  open?: string;
  close?: string;
  start?: string;
  end?: string;
  qtyLeft: string;
}

export type Restaurant = {
  objectId: string;
  name: string;
  address1: string;
  suburb: string;
  cuisines: string[];
  imageLink: string;
  open: string;
  close: string;
  deals: Deal[];
}

export interface RestaurantResponse {
  restaurants: Restaurant[];
}
