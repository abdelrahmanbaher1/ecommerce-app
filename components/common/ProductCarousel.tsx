import { TProduct } from "@/lib/types";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductBox from "../productBox";
type TProps = {
  products: TProduct[];
  isLoading?: boolean;
};

const ProductCarousel = ({ products, isLoading = false }: TProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const skeleton =
    "w-34 h-34 sm:w-36 sm:h-36 md:w-52 md:h-52 animate-pulse  bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center";
  const titleSkeleton =
    "w-20 h-4 sm:w-32 sm:h-5 md:w-40 md:h-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700";

  if (isLoading) {
    return (
      <div className="overflow-hidden px-3 md:h-full w-full flex flex-col">
        {/* {title && (
          <Skeleton
            width="15%"
            height="30px"
            className="mb-4 px-3 font-medium text-lg capitalize text-dark"
          />
        )} */}
        <div className="grid gap-10 w-full grid-cols-3 md:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div
              className="flex flex-col gap-5 items-center"
              key={`Skeleton-${index}`}
            >
              <div className={skeleton} />
              <div className={titleSkeleton}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <>
      <h2>Explore Our Products</h2>
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
                      // className="text-4xl font-semibold"
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
