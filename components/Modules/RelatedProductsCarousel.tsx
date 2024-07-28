"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PRODUCT_BOX_VARIANT, REACT_QUERY_KEYS } from "@/lib/helpers/constants";
import { getCategoryProducts } from "@/services/ProductService";
import { useQuery } from "@tanstack/react-query";
import ProductBox from "../Product/ProductBox/ProductBox";
import Skeleton from "@/components/common/Loaders/Skeleton";
import useAppContext from "@/core/contexts/AppContext";
import React from "react";

type TProps = {
  categoryId: number;
  mobileSize?: boolean;
};

const RelatedProductsCarousel = ({
  categoryId,
  mobileSize = false,
}: TProps) => {
  const { data: categoryProducts, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_ALL_PRODUCTS, categoryId],
    queryFn: () => getCategoryProducts(categoryId),
  });
  const { isMobile } = useAppContext();
  const width = mobileSize ? "400px" : isMobile ? "400px" : "750px";

  if (isLoading) {
    return (
      <div className="overflow-hidden md:h-full w-full flex flex-col">
        <div className="flex gap-2 w-full grid-cols-3 md:grid-cols-5">
          {[...Array(3)].map((_, index) => (
            <div className="flex flex-col gap-2" key={`Skeleton-${index}`}>
              <Skeleton fullWidth={!isMobile} />
              <Skeleton fullWidth={!isMobile} renderTitleSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categoryProducts) return null;
  return (
    <>
      {isMobile ? (
        <div className={` max-w-[${width}] pl-5 pr-5`}>
          <h2 className="mb-4 text-2xl font-bold flex justify-between">
            Related Products
          </h2>
          <ul className="flex overflow-hidden gap-3 overflow-x-scroll snap-proximity snap-x scrollbar-thin scrollbar-thumb-gray-400">
            {categoryProducts.map((product) => (
              <li className="snap-center">
                <ProductBox
                  product={product}
                  variant={PRODUCT_BOX_VARIANT.FULL}
                  key={product.id}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ScrollArea
          className={`h-full w-full max-w-[${width}]  overflow-hidden`}
        >
          <div className="flex w-max space-x-4 p-4">
            {categoryProducts.map((product) => (
              <figure
                key={product.id}
                className="shrink-0 w-32 sm:w-36 md:w-40"
              >
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
      )}
    </>
  );
};

export default RelatedProductsCarousel;
