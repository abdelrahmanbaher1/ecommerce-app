import { TProduct } from "../types";

/**
 * @param  {TProduct[]} products
 * @returns {[number,number]} Max And Min Price
 */
export const getMaxAndMinPrice = (products: TProduct[]) => {
  const prices = products.map((product) => product.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  return [maxPrice, minPrice];
};
