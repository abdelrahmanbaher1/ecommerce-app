"use client";

import { TCartItem } from "@/lib/types";
import React from "react";

type TProps = {
  cartItem: TCartItem;
};

const CartItem = ({ cartItem }: TProps) => {
  const { price, quantity, title, images } = cartItem;
  return (
    <div className="flex justify-around p-2 rounded-lg border">
      <div className="flex w-1/2 flex-col ">
        <img
          className="transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-zoom-in"
          src={images[0]}
          width={100}
          height={30}
          alt="cartImg"
        />
        <p className="text-sm ">{title}</p>
      </div>
      <div className="flex flex-col  gap-2 mt-1">
        <span className="text-sm font-bold">Price : ${price.toFixed(2)}</span>
        <span className="text-sm line-through opacity-50">
          ${(price + 100).toFixed(2)}
        </span>
        <span className=" bg-green-400 dark:bg-green-500 px-1.5 py-0.5 rounded-md text-xs text-white">
          Save 20%
        </span>

        <div className="sm flex justify-center gap-1 text-gray-300 w-full">
          <span className="px-6 py-2 rounded-full text-xs bg-gray-100 dark:bg-gray-700">
            <button>-</button>
            {quantity}
            <button>+</button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
