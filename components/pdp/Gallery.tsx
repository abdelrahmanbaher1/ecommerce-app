"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useReducer, useRef } from "react";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const ReachMaxref = useRef(false);
  const reducer = (state: number, action: { type: string }) => {
    switch (action.type) {
      case "INC":
        return state < images.length - 1 ? state + 1 : state;
      case "DEC":
        return state > 0 ? state - 1 : state;
      case "EQUAL":
        return state;
      default:
        return state;
    }
  };

  const [currentIdx, dispatch] = useReducer(reducer, 0);

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  return (
    <>
      <div className="relative w-full aspect-square h-full max-h-[850px]">
        {images[currentIdx] && (
          <Image
            className="h-full w-full object-contain hover:scale(1.1)"
            fill
            alt={images[currentIdx]?.altText as string}
            src={images[currentIdx]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center ">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <div
                aria-label="Previous product image"
                onClick={() => dispatch({ type: "DEC" })}
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5 " />
              </div>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <div
                aria-label="Next product image"
                onClick={() => dispatch({ type: "INC" })}
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </div>
            </div>
          </div>
        ) : null}

        {/* {images.length > 1 ? (
          <ul className="border-white border-solid">
            {images.map((image, index) => {
              const isActive = index === currentIdx;

              return (
                <li key={image.src} className="h-20 w-20">
                  <div
                    aria-label="Enlarge product image"
                    onClick={() => dispatch({ type: "INC" })}
                    className="h-full w-full"
                  >
                    <img
                      alt={image.altText}
                      src={image.src}
                      width={2000}
                      height={2000}
                      //   active={isActive}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null} */}
      </div>
    </>
  );
}

const tmpComponent = () => (
  <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
    {images[currentIdx] && (
      <Image
        className="h-full w-full object-contain cursor:zoom-in"
        fill
        // sizes="(min-width: 1024px) 66vw, 100vw"
        alt={images[currentIdx]?.altText as string}
        src={images[currentIdx]?.src as string}
        priority={true}
      />
    )}

    {images.length > 1 ? (
      <div className="absolute bottom-[15%] flex w-full justify-center ">
        <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
          <div
            aria-label="Previous product image"
            onClick={() => dispatch({ type: "DEC" })}
            className={buttonClassName}
          >
            <ArrowLeftIcon className="h-5 " />
          </div>
          <div className="mx-1 h-6 w-px bg-neutral-500"></div>
          <div
            aria-label="Next product image"
            onClick={() => dispatch({ type: "INC" })}
            className={buttonClassName}
          >
            <ArrowRightIcon className="h-5" />
          </div>
        </div>
      </div>
    ) : null}

    {/* {images.length > 1 ? (
          <ul className="border-white border-solid">
            {images.map((image, index) => {
              const isActive = index === currentIdx;

              return (
                <li key={image.src} className="h-20 w-20">
                  <div
                    aria-label="Enlarge product image"
                    onClick={() => dispatch({ type: "INC" })}
                    className="h-full w-full"
                  >
                    <img
                      alt={image.altText}
                      src={image.src}
                      width={2000}
                      height={2000}
                      //   active={isActive}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null} */}
  </div>
);
