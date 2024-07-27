import { API_BASE_URL } from "@/lib/helpers/constants";
import { TCategory, TProduct } from "@/lib/types";

export async function getAllCategories(
  customHeaders?: any
): Promise<TCategory[]> {
  const response = await fetch(`${API_BASE_URL}categories`, {
    method: "GET",
    headers: {
      "x-guest": "error",
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });
  const data: Promise<TCategory[]> = await response.json();

  return (await data) as TCategory[];
}

export async function getProductDetails(
  categoryId?: string,
  customHeaders?: any
): Promise<TCategory> {
  const response = await fetch(`${API_BASE_URL}categories/${categoryId}`, {
    method: "GET",
    headers: {
      "x-guest": "error",
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });
  const data: Promise<TCategory> = await response.json();

  return (await data) as TCategory;
}
