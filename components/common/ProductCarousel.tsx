"use client";

import { TProduct } from "@/lib/types";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductBox from "../Product/ProductBox/ProductBox";
import { PRODUCT_BOX_VARIANT } from "@/lib/helpers/constants";
import Skeleton from "./Loaders/Skeleton";
type TProps = {
  products: TProduct[];
  isLoading?: boolean;
};

const ProductCarousel = ({ products, isLoading = false }: TProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (isLoading) {
    return (
      <div className="overflow-hidden px-3 md:h-full w-full flex flex-col">
        <div className="grid gap-10 w-full grid-cols-3 md:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <div
              className="flex flex-col gap-5 items-center"
              key={`Skeleton-${index}`}
            >
              <Skeleton round />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!products || products.length === 0) return;
  return (
    <>
      <h2 className="text-xl text-center mt-2 sm:text-xl font-bold ">
        Explore Products
      </h2>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xl "
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {products.map((product: TProduct, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-transparent">
                  <CardContent className="w-full flex items-center justify-center p-6">
                    <ProductBox
                      product={product}
                      variant={PRODUCT_BOX_VARIANT.FULL}
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default ProductCarousel;
