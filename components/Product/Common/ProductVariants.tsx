import { PRODUCT_VARIANTS } from "@/lib/helpers/constants";
import clsx from "clsx";
import React from "react";

type TProps = {
  onClick: (variant: string) => void;
  variantSelected: string | null;
};

const ProductVariants = ({ onClick, variantSelected }: TProps) => {
  return (
    <div className="flex gap-1">
      {PRODUCT_VARIANTS.map((variant) => (
        <button
          key={variant}
          className="lg:basis-1/6"
          onClick={() => onClick(variant)}
        >
          <div className="flex items-center gap-2 mt-3">
            <button
              className={clsx(
                "flex min-w-[48px] items-center justify-center rounded-full border md:min-w-[65px] bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                {
                  "border-2 border-blue-600 dark:border-blue-500 ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:border-blue-600":
                    variant === variantSelected,
                }
              )}
            >
              {variant}
            </button>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProductVariants;
