"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import useAppContext from "@/core/contexts/AppContext";
import { TCartItem } from "@/lib/types";

type TProps = {
  btnClassName?: string;
  product: TCartItem;
};

const AddToCartBtn = ({ btnClassName = "", product }: TProps) => {
  const { addToCart } = useAppContext();
  return (
    <Button className={btnClassName} onClick={() => addToCart(product)}>
      Add To Cart
    </Button>
  );
};

export default AddToCartBtn;
