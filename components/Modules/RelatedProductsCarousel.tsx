"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { REACT_QUERY_KEYS } from "@/lib/helpers/constants";
import { getCategoryProducts } from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";
import ProductBox from "../productBox";
import Skeleton from "../common/Skeleton";

type TProps = {
  categoryId: number;
};

const RelatedProductsCarousel = ({ categoryId }: TProps) => {
  const { data: categoryProducts, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_PRODUCTS, categoryId],
    queryFn: () => getCategoryProducts(categoryId),
  });

  const skeleton =
    "w-32 h-40 sm:w-36 sm:h-48 md:w-40 md:h-52 animate-pulse bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center";
  const titleSkeleton =
    "w-20 h-4 sm:w-32 sm:h-5 md:w-40 md:h-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700";

  if (isLoading) {
    return (
      <div className="overflow-hidden px-3 md:h-full w-full flex flex-col">
        <div className="grid gap-10 w-full grid-cols-3 md:grid-cols-5">
          {[...Array(3)].map((_, index) => (
            <div
              className="flex flex-col gap-5 items-center"
              key={`Skeleton-${index}`}
            >
              <Skeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categoryProducts) return null;
  return (
    <ScrollArea className="h-full w-full max-w-[500px] overflow-hidden">
      <div className="flex w-max space-x-4 p-4">
        {categoryProducts.map((product) => (
          <figure key={product.id} className="shrink-0 w-32 sm:w-36 md:w-40">
            <div className="overflow-hidden rounded-md">
              <ProductBox product={product} variant="carousel" />
              {/* <img
                src={product.images[0]}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                alt={product.title}
              /> */}
            </div>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default RelatedProductsCarousel;
