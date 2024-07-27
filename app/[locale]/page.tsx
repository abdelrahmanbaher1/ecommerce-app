"use client";

import CategoryCarouselModule from "@/components/Modules/CategoryCarouselModule";
import Carousel from "@/components/common/Carousel";
import ProductCarousel from "@/components/common/ProductCarousel";
import { REACT_QUERY_KEYS } from "@/lib/helpers/constants";
import { TCategory } from "@/lib/types";
import { getAllCategories } from "@/services/CategoryService";
import { getAllProducts } from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategories,
  });

  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_PRODUCTS],
    queryFn: getAllProducts,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-3">
      {/* <ProductCarousel isLoading={isProductsLoading} products={products} /> */}
      <Carousel
        modules={categories as TCategory[]}
        isLoading={isCategoriesLoading}
      />
      <CategoryCarouselModule
        categories={categories as TCategory[]}
        isLoading={isCategoriesLoading}
      />
      {/* <div className="z-10 gap-5 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex"></div> */}
    </main>
  );
}
