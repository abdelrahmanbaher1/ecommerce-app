"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useReducer, useRef } from "react";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const reducer = (state: number, action: { type: string }) => {
    switch (action.type) {
      case "INC":
        return state < images.length - 1 ? state + 1 : state;
      case "DEC":
        return state > 0 ? state - 1 : state;
      case "SET":
        return action.index;
      default:
        return state;
    }
  };

  const [currentIdx, dispatch] = useReducer(reducer, 0);

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out dark:hover:text-white flex items-center justify-center";

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {images.length > 1 ? (
        <ul className="flex gap-5  items-center lg:flex-col space-y-2 p-2 overflow-y-auto h-full max-h-[800px]  scrollbar-thin scrollbar-thumb-gray-400">
          {images.map((image, index) => {
            const isActive = index === currentIdx;

            return (
              <li
                key={image.src}
                className={`cursor-pointer border-2 ${
                  isActive ? "border-blue-500" : "border-transparent"
                } rounded overflow-hidden`}
              >
                <div
                  onClick={() => dispatch({ type: "SET", index })}
                  className="h-full w-full"
                >
                  <Image
                    alt={image.altText}
                    src={image.src}
                    width={100}
                    height={100}
                    className={`object-cover ${
                      isActive ? "opacity-100" : "opacity-50"
                    } hover:opacity-100`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="relative flex-1 aspect-square h-full max-h-[850px]">
        {images[currentIdx] && (
          <Image
            className="h-full w-full object-contain  transition-transform duration-300"
            fill
            alt={images[currentIdx]?.altText as string}
            src={images[currentIdx]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <div
                onClick={() => dispatch({ type: "DEC" })}
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </div>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <div
                onClick={() => dispatch({ type: "INC" })}
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
