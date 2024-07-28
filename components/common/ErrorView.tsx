import { ERRORVIEW } from "@/lib/helpers/constants";
import React from "react";
import LogoIcon from "./Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCarousel from "./ProductCarousel";
import { FALLBACK_PRODUCTS } from "@/productBackup";

type TProps = {
  type?: ERRORVIEW;
  showHomeButton?: boolean;
};

const ErrorView = ({
  type = ERRORVIEW.GENERIC_ERROR,
  showHomeButton = true,
}: TProps) => {
  const { subTitle, title } = getErrorInfo(type);

  return (
    <section
      aria-label="Error View"
      className="flex flex-col mt-20 items-center justify-center gap-3"
    >
      <LogoIcon />
      <h3 className="text-2xl">{title}</h3>
      <span className="text-l text-gray-500">{subTitle}</span>
      {showHomeButton && (
        <Button className="w-1/4">
          <Link href="/">Go Home</Link>
        </Button>
      )}
      <>
        <h2 className="font-l font-bold">
          Or Take Another Look At Our Products
        </h2>
        <ProductCarousel products={FALLBACK_PRODUCTS} />
      </>
    </section>
  );
};

const getErrorInfo = (type: ERRORVIEW): { title: string; subTitle: string } => {
  switch (type) {
    case ERRORVIEW.EMPTY_CATEGORY:
      return {
        title:
          "Oops! We This Category Doesn't Cotnain Any Products Try Another Category",
        subTitle: "Sorry about this, please try again some time later ... ",
      };
    case ERRORVIEW.EMPTY_CART:
      return {
        title: "Your Cart Is Empty",
        subTitle: "Try to Add items to the cart ",
      };
    default:
      return {
        title: "Oops! Unkown error occured",
        subTitle: "Sorry about this, please try again some time later ... ",
      };
  }
};
export default ErrorView;
