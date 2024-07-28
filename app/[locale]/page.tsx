"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

import CategoryCarouselModule from "@/components/Modules/CategoryCarouselModule";
import Carousel from "@/components/common/Carousel";
import { REACT_QUERY_KEYS } from "@/lib/helpers/constants";
import { TCategory } from "@/lib/types";
import { getAllCategories } from "@/services/CategoryService";
import { useQuery } from "@tanstack/react-query";
import useIsInViewport from "@/lib/hooks/useInView";
import RelatedProductsCarousel from "@/components/Modules/RelatedProductsCarousel";
import ProductCarousel from "@/components/common/ProductCarousel";
import { FALLBACK_PRODUCTS } from "@/productBackup";
import TmpCarousel from "@/components/Modules/ProductCarousel";

export default function Page() {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_CATEGORIES],
    queryFn: getAllCategories,
  });

  const categoryModuleRef = useRef(null);
  const isCategoryModuleInView = useIsInViewport(categoryModuleRef);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-3">
      <h1 className="text-xl font-bold mb-3 mt-3">
        Choose From Different Categories
      </h1>
      <Carousel
        modules={categories as TCategory[]}
        isLoading={isCategoriesLoading}
      />
      <motion.div
        ref={categoryModuleRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: isCategoryModuleInView ? 1 : 0,
          y: isCategoryModuleInView ? 0 : 50,
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <CategoryCarouselModule
          categories={categories as TCategory[]}
          isLoading={isCategoriesLoading}
        />
      </motion.div>
      <RelatedProductsCarousel categoryId={2} />

      <TmpCarousel products={FALLBACK_PRODUCTS} />
    </main>
  );
}
