"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PRODUCT_BOX_VARIANT, REACT_QUERY_KEYS } from "@/lib/helpers/constants";
import { getCategoryProducts } from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";
import ProductBox from "../Product/ProductBox/ProductBox";
import Skeleton from "@/components/common/Loaders/Skeleton";
import React from "react";
import clsx from "clsx";

type TProps = {
  categoryId: number;
  fullSize?: boolean;
};

const RelatedProductsCarousel = ({ categoryId, fullSize = false }: TProps) => {
  const {
    data: categoryProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_PRODUCTS, categoryId],
    queryFn: () => getCategoryProducts(categoryId),
  });

  if (isLoading) {
    return (
      <div className="overflow-hidden md:h-full w-full flex flex-col">
        <div className="flex gap-2 w-full grid-cols-3 md:grid-cols-5">
          {[...Array(3)].map((_, index) => (
            <div className="flex flex-col gap-2" key={`Skeleton-${index}`}>
              <Skeleton fullWidth={true} />
              <Skeleton fullWidth={!true} renderTitleSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categoryProducts || isError) return null;
  return (
    <>
      <ScrollArea
        className={clsx(`h-full w-full max-w-[400px]   overflow-hidden`, {
          "max-w-[1000px]": fullSize,
        })}
      >
        <div className="flex w-max space-x-4 p-4">
          {categoryProducts.map((product) => (
            <figure key={product.id} className="shrink-0 w-32 sm:w-36 md:w-40">
              <div className="overflow-hidden rounded-md">
                <ProductBox
                  product={product}
                  variant={PRODUCT_BOX_VARIANT.CAROUSEL}
                />
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

export default RelatedProductsCarousel;
