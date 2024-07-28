import useAppContext from "@/core/contexts/AppContext";
import { TCategory } from "@/lib/types";
import Link from "next/link";
import React, { useState } from "react";

type TProps = {
  category: TCategory;
};

const CategoryContent = ({ category }: TProps) => {
  const { image, name, id } = category;
  const { locale } = useAppContext();
  const [isError, setIsError] = useState(false);
  const renderImage = () => (
    <img
      className="rounded-full max-w-[100px] max-h-[100px] md:max-w-[200px] md:max-h-[200px] transition-transform duration-300 ease-in-out transform hover:scale-110"
      src={image}
      alt={name}
      width={200}
      height={200}
      onError={() => setIsError(true)}
    />
  );
  if (isError) return null; // this to not render anything if no Image Found
  return (
    <Link
      href={`/${locale}/category/${name}-${id}`}
      className="flex flex-col gap-5 items-center"
    >
      <div>{renderImage()}</div>
      <span className="sm:text-sm justify-center">{name}</span>
    </Link>
  );
};

export default CategoryContent;
