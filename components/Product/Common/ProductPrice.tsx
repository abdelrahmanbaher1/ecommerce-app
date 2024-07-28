import clsx from "clsx";
import React from "react";

type TProps = {
  price: number;
  originalPrice: number;
  discountTag: string;
  isVertical?: boolean;
  cutsomStyle?: React.CSSProperties;
};

const ProductPrice = ({
  price,
  originalPrice,
  discountTag,
  isVertical = false,
  cutsomStyle = {},
}: TProps) => {
  const containerClass = isVertical
    ? "flex flex-col gap-2 items-center"
    : "flex justify-between items-center";
  return (
    <div className={clsx(containerClass)} style={cutsomStyle}>
      <span className="text-sm md:text-lg font-bold md:font-bold">
        Price: $ {price.toFixed(2)}
      </span>
      <span className="text-xs line-through opacity-50">
        Was: ${originalPrice.toFixed(2)}
      </span>
      <span className="text-sm flex justify-center items-center bg-green-400 dark:bg-green-500 px-1.5 py-0.5 rounded-md text-s text-white">
        {discountTag}
      </span>
    </div>
  );
};

export default ProductPrice;
