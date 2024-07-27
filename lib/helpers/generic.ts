import { TProduct } from "../types";

export const getMaxAndMinPrice = (products: TProduct[]) => {
  const prices = products.map((product) => product.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  return [maxPrice, minPrice];
};

import * as React from "react";
