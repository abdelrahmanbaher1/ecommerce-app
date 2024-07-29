"use client";

import { TCartItem } from "@/lib/types";
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useAppContext from "@/contexts/AppContext";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import ProductPrice from "../Common/ProductPrice";

type TProps = {
  cartItem: TCartItem;
};

const CartProductBox = ({ cartItem }: TProps) => {
  const { removeFromCart } = useAppContext();
  const { toast } = useToast();

  const { price, title, images, id, variant } = cartItem;

  const renderImage = () => (
    <div className="flex w-1/2 flex-col">
      <div className="relative">
        <img
          className="w-full transform transition-transform duration-300 ease-in-out hover:scale-105 cursor-zoom-in"
          src={images[0]}
          alt="cartImg"
        />
        <XMarkIcon
          onClick={() => {
            removeFromCart(id);
            toast({
              title: "Item Has Been Removed Successfully From The Cart",
              duration: 1000,
            });
          }}
          className="absolute top-2 right-2 h-4 w-4 text-white bg-red-500 rounded-full hover:bg-red-700 cursor-pointer"
        />
      </div>
      <p className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap mt-1 max-w-[200px]">
        {title}
      </p>
    </div>
  );
  return (
    <div className=" flex justify-around p-2 rounded-lg border">
      {renderImage()}
      <div>
        <ProductPrice
          price={price}
          originalPrice={price + 100}
          discountTag="Save 20%"
          isVertical
        />
        <span className="text-sm text-gray-700 font-semibold">
          Variant:
          <span className="flex min-w-[48px] items-center justify-center rounded-full border md:min-w-[65px] bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900">
            {variant}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CartProductBox;
