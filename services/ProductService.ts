import { API_BASE_URL } from "@/lib/helpers/constants";
import { TProduct } from "@/lib/types";

// Function to get all products with optional custom headers
export async function getAllProducts(
  id?: string,
  customHeaders?: HeadersInit
): Promise<TProduct[]> {
  const response = await fetch(`${API_BASE_URL}products`, {
    method: "GET",
    headers: {
      "x-guest": "error",
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });

  if (!response.ok) {
    // Check if the response is OK
    throw new Error("Failed to fetch products"); // Throw an error if not
  }

  const data = await response.json(); // No need to use Promise<TProduct[]> here
  return data as TProduct[];
}

// Function to get details of a specific product
export async function getProductDetails(
  productId: number,
  customHeaders?: HeadersInit
): Promise<TProduct> {
  // Change return type to TProduct

  // Fetch product details from the API
  const response = await fetch(`${API_BASE_URL}products/${productId}`, {
    method: "GET",
    headers: {
      "x-guest": "error",
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });

  if (!response.ok) {
    // Check if the response is OK
    throw new Error(`Failed to fetch product details for ID: ${productId}`); // Throw an error if not
  }

  const data = await response.json();
  return data as TProduct;
}

// Function to get products by category
export async function getCategoryProducts(
  categoryId: number
): Promise<TProduct[]> {
  try {
    const products = await getAllProducts();

    const filteredProducts = products.filter(
      (product: TProduct) => product.category.id === categoryId
    );

    return filteredProducts;
  } catch (error) {
    console.error("Error fetching category products:", error);
    throw new Error("Failed to fetch category products");
  }
}
