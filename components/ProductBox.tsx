"use client";

import { TProduct } from "@/lib/types";
import Link from "next/link";
import React from "react";
import ProductImageSlider from "./common/ProductImageSlider";
import useAppContext from "@/core/contexts/AppContext";
import ProductPrice from "./product/ProductPrice";
import AddToCartBtn from "./common/AddToCartBtn";

type TProps = {
  product: TProduct;
  variant?: "full" | "carousel" | "cart";
};

const ProductBox = ({ product, variant }: TProps) => {
  const { images, category, title, price, description, id } = product;
  const { locale } = useAppContext();
  const { addToCart } = useAppContext();

  const renderProductImages = () => (
    <img
      alt={title}
      src={images[0]}
      width={200}
      height={200}
      className="object-cover w-[200px] h-[200px]"
    />
  );

  const renderDetailsContainer = () => (
    <div className="pt-3.5 pr-2 pb-2.5 relative flex flex-col justify-start w-[200px]">
      <span className="text-sm font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
        {title}
      </span>
      <span className="text-xs text-grey font-bold overflow-hidden whitespace-nowrap overflow-ellipsis">
        {description}
      </span>
      <span>{price} $</span>
    </div>
  );
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-full h-full shadow-lg rounded-md overflow-hidden flex flex-col">
      <Link href={`/${locale}/product/${id}`}>
        <div className="h-48 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <img
            alt={title}
            src={images[0]}
            className="object-cover w-full h-full rounded-t-md transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-zoom-in"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700">
            {category.name}
          </span>
        </div>

        <h2 className="font-semibold text-xl overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </h2>

        {variant !== "carousel" ? (
          <div>
            <ProductPrice
              price={price}
              originalPrice={price}
              discountTag="Save 20%"
            />

            <div className="mt-5 w-full flex justify-center">
              <AddToCartBtn
                btnClassName=" w-[200px] bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                product={{ ...product, quantity: 1 }}
              >
                Add To Cart
              </AddToCartBtn>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductBox;
