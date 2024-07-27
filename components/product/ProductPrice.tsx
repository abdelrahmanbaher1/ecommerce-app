import React from "react";

type TProps = {
  price: number;
  originalPrice: number;
  discountTag: string;
};

const ProductPrice = ({ price, originalPrice, discountTag }: TProps) => {
  return (
    <div className="flex justify-between ">
      <span className="text-l font-bold">Price: ${price.toFixed(2)}</span>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm line-through opacity-50">
          ${originalPrice.toFixed(2)}
        </span>
        <span className="bg-green-400 dark:bg-green-500 px-1.5 py-0.5 rounded-md text-xs text-white">
          {discountTag}
        </span>
      </div>
    </div>
  );
};

export default ProductPrice;
