"use client";

import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "../ui/sheet";
import { Separator } from "@/components/ui/separator";
import useAppContext from "@/core/contexts/AppContext";
import { TCartItem } from "@/lib/types";
import CartItem from "../cartItem";

const Cart = () => {
  const { cartItems } = useAppContext();
  const quantity = cartItems.length;

  return (
    <div className="relative">
      <Sheet>
        <SheetTrigger asChild>
          <ShoppingCartIcon
            width={24}
            height={24}
            strokeWidth={2}
            className="hover:cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="overflow-y-scroll ">
          <SheetHeader>
            <SheetTitle>Shopping cart</SheetTitle>
            <Separator className="my-4" />
          </SheetHeader>
          <ul className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <CartItem cartItem={item} key={item.id} />
            ))}
          </ul>
        </SheetContent>
        {quantity ? (
          <div className="flex justify-center absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-900 text-[11px] font-medium text-white">
            {quantity}
          </div>
        ) : null}
      </Sheet>
    </div>
  );
};

export default Cart;
