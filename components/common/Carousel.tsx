import React, { useEffect, useState } from "react";
import Logo from "@/public/icons/Logo.svg"; // Ensure this is a valid image file
import { TCategory } from "@/lib/types";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useAppContext from "@/core/contexts/AppContext";

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
  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="relative">
        <div className="relative overflow-hidden rounded-lg h-56 sm:h-64 xl:h-80 2xl:h-96">
          {modules.map((slide, index) => (
            <Link
              href={`${locale}/category/${slide.name}-${slide.id}`}
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${
                currentIndex === index ? "block" : "hidden"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ objectFit: "cover" }}
              />
              <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-white">
                {slide.name}
              </span>
            </Link>
          ))}
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
        {/* Slider controls */}
        <button
          type="button"
          className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          onClick={handlePrev}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          onClick={handleNext}
        >
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
