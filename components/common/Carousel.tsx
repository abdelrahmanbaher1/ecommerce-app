import React, { useEffect, useState } from "react";
import { TCategory, TProduct } from "@/lib/types";
import Link from "next/link";
import useAppContext from "@/core/contexts/AppContext";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import Icon from "./Icon";

type TProps = {
  modules: TCategory[];
  isLoading: boolean;
};

const Carousel = ({ modules, isLoading }: TProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { locale } = useAppContext();

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? modules.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === modules.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (isLoading) {
    return (
      <>
        <div className="w-full h-56 sm:w-36 sm:h-64 md:w-2/3 md:h-52 animate-pulse  bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center"></div>
      </>
    );
  }
  const renderProductImage = (
    { name, id, image }: TCategory,
    index: number
  ) => (
    <Link
      href={`${locale}/category/${name}-${id}`}
      key={id}
      className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
        currentIndex === index ? "block" : "hidden"
      }`}
    >
      <img
        src={image}
        alt={name}
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ objectFit: "cover" }}
      />
      <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-white">
        {name}
      </span>
    </Link>
  );

  const renderControls = () => (
    <>
      <button
        type="button"
        className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
        onClick={handlePrev}
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <Icon name="ArrowLeft" alt="arrowLeft" />
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
        onClick={handleNext}
      >
        <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <Icon name="ArrowRight" alt="arrowRight" />
          <span className="sr-only">Next</span>
        </span>
      </button>
    </>
  );

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg h-56 sm:h-64 xl:h-80 2xl:h-96">
          {modules.map(renderProductImage)}
        </div>

        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {modules.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-blue-600" : "bg-white"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        {renderControls()}
      </div>
    </div>
  );
};

export default Carousel;
