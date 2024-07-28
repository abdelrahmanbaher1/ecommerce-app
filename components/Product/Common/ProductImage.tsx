import React from "react";

type TProps = {
  image: string;
  altText: string;
};

const ProductImage = ({ image, altText }: TProps) => {
  return (
    <div className="h-48 w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <img
        alt={altText}
        src={image}
        className="object-cover w-full h-full rounded-t-md transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-zoom-in"
      />
    </div>
  );
};

export default ProductImage;
