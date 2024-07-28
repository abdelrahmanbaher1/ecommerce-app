"use client";

import { TCartItem, TProduct } from "@/lib/types";
import React from "react";

import { PRODUCT_BOX_VARIANT } from "@/lib/helpers/constants";
import ProductBoxFull from "./ProductBoxFull";
import CartProductBox from "./CartProductBox";
import CarouselProductBox from "./CarouselProductBox";

type TProps = {
  product: TProduct | TCartItem;
  variant: PRODUCT_BOX_VARIANT;
};

const ProductBox = ({ product, variant }: TProps) => {
  switch (variant) {
    case PRODUCT_BOX_VARIANT.FULL:
      return <ProductBoxFull product={product as TProduct} />;
    case PRODUCT_BOX_VARIANT.CART:
      return <CartProductBox cartItem={product as TCartItem} />;
    case PRODUCT_BOX_VARIANT.CAROUSEL:
      return <CarouselProductBox product={product as TProduct} />;
  }
};

export default ProductBox;
