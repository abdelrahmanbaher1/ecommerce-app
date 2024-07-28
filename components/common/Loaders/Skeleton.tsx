import clsx from "clsx";
import React from "react";

type TProps = {
  className?: string;
  fullWidth?: boolean;
  renderTitleSkeleton?: boolean;
  round?: boolean;
};

const Skeleton = ({
  className,
  fullWidth = false,
  renderTitleSkeleton,
  round = false,
}: TProps) => {
  const width = fullWidth ? "full" : "40";

  const skeletonClass = `w-${width} h-40 sm:w-36 sm:h-48 md:w-${width} md:h-52 animate-pulse bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center`;
  const titleSkeletonClass = `w-${width} h-4 sm:w-32 sm:h-5 md:w-${width} md:h-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700`;

  const roundSkeleton =
    "w-34 h-34 sm:w-36 sm:h-36 md:w-52 md:h-52 animate-pulse bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center rounded-full";
  const roundTitleSkeleton =
    "w-20 h-4 sm:w-32 sm:h-5 md:w-40 md:h-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700";

  return (
    <div
      className={clsx(
        renderTitleSkeleton
          ? round
            ? roundTitleSkeleton
            : titleSkeletonClass
          : round
          ? roundSkeleton
          : skeletonClass,
        className
      )}
    />
  );
};

export default Skeleton;
