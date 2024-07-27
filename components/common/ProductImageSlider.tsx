"use client";

import React, { useMemo, useState } from "react";

type TProps = {
  imageKeys: string[];
  title: string;
};

const ProductImageSlider = ({ imageKeys, title }: TProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const imageNodes = useMemo(() => {
    return imageKeys.map((imageKey, idx) => {
      if (idx <= currentIdx + 1) {
        return (
          <div key={imageKey} className="snap-center snap-always ">
            <img
              alt={title}
              src={imageKey}
              width={200}
              height={200}
              className="object-cover w-[200px] h-[200px]"
            />
          </div>
        );
      }

      return <div key={imageKey} />;
    });
  }, [imageKeys, currentIdx]);

  const handleSwipe = (e: any) => {
    const { clientWidth, scrollLeft } = e.target;
    const newIdx = Math.round(Math.abs(scrollLeft) / clientWidth);

    // indicatorsRef.current.setCurrent(newIdx);

    if (newIdx > currentIdx) {
      setCurrentIdx(newIdx);
    }
  };
  return (
    <div className="relative">
      <div
        className="flex w-full overflow-auto snap-x snap-mandatory"
        onScroll={handleSwipe}
      >
        {imageNodes}
      </div>
    </div>
  );
};

export default ProductImageSlider;
