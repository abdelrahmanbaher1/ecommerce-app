"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "../ui/sheet";
import { Separator } from "@/components/ui/separator";
import useAppContext from "@/contexts/AppContext";
import { useToast } from "../ui/use-toast";
import clsx from "clsx";
import ErrorView from "../common/ErrorView";
import { ERRORVIEW, PRODUCT_BOX_VARIANT } from "@/lib/helpers/constants";
import ProductBox from "../Product/ProductBox/ProductBox";

const Cart = () => {
  const { cartItems, clearCart } = useAppContext();
  const { toast } = useToast();
  const quantity = cartItems.length;

  useEffect(() => {}, []);

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
        <SheetContent className="overflow-y-scroll">
          <SheetHeader>
            <button
              className={clsx("self-start underline hover:text-gray-500", {
                "cursor-not-allowed": cartItems.length === 0,
              })}
              onClick={() => {
                clearCart();
                toast({
                  title: "All Items Have Been Removed From Your Cart",
                  duration: 1000,
                });
              }}
              disabled={cartItems.length === 0}
            >
              Clear
            </button>
            <SheetTitle>Shopping cart</SheetTitle>
            <Separator className="my-4" />
          </SheetHeader>
          <ul className="flex flex-col gap-3">
            {cartItems.map((item) => (
              <ProductBox
                product={item}
                variant={PRODUCT_BOX_VARIANT.CART}
                key={item.id}
              />
            ))}
          </ul>
          {cartItems.length === 0 && (
            <ErrorView type={ERRORVIEW.EMPTY_CART} showHomeButton={false} />
          )}
        </SheetContent>
        {quantity > 0 && (
          <div className="flex justify-center absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-900 text-[11px] font-medium text-white">
            {quantity}
          </div>
        )}
      </Sheet>
    </div>
  );
};

export default Cart;
