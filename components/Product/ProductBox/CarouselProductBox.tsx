import { TProduct } from "@/lib/types";
import Link from "next/link";
import React from "react";
import useAppContext from "@/core/contexts/AppContext";
import { Button } from "@/components/ui/button";
import ProductImage from "../Common/ProductImage";
import Pill from "@/components/common/Pill";

type TProps = {
  product: TProduct;
};

const CarouselProductBox = ({ product }: TProps) => {
  const { category, title, images, id } = product;
  const { locale } = useAppContext();

  return (
    <div className="max-h-[350px] max-w-[300px] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-full h-full shadow-lg rounded-md overflow-hidden flex flex-col">
      <Link href={`/${locale}/product/${id}`}>
        <ProductImage image={images[0]} altText={title} />
        <div className="p-2 flex flex-col gap-3 flex-grow">
          <Pill pillItem={category.name} />

          <h2 className="font-semibold text-xl w-2/3 overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h2>
          <Button>
            <Link href={`/${locale}/product/${id}`}> Go To Product</Link>
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default CarouselProductBox;
