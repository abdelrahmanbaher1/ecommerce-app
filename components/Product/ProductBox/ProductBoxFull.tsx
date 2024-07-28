import { TProduct } from "@/lib/types";
import React from "react";
import ProductPrice from "../Common/ProductPrice";
import AddToCartBtn from "../../common/AddToCartBtn";
import useAppContext from "@/core/contexts/AppContext";
import Link from "next/link";
import ProductImage from "../Common/ProductImage";
import Pill from "@/components/common/Pill";

type TProps = {
  product: TProduct;
};

const ProductBoxFull = ({ product }: TProps) => {
  const { locale } = useAppContext();

  const { category, price, title, images, id } = product;

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 max-w-[300px] h-full shadow-lg rounded-md overflow-hidden flex flex-col">
      <Link href={`/${locale}/product/${id}`}>
        <ProductImage image={images[0]} altText={title} />
      </Link>
      <div className="p-5 flex flex-col gap-3 flex-grow">
        <Pill pillItem={category.name} />

        <h2
          className={
            "font-semibold text-xl w-2/3 overflow-hidden text-ellipsis whitespace-nowrap"
          }
        >
          {title}
        </h2>

        <div>
          <ProductPrice
            price={price}
            originalPrice={price + 100}
            discountTag="Save 20%"
          />

          <div className="mt-5 w-full flex justify-center">
            <AddToCartBtn
              btnClassName=" w-[200px] bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
              product={{ ...product, quantity: 1, variant: "s" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBoxFull;
