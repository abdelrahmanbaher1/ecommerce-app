import clsx from "clsx";
import React from "react";

type TProps = {
  className?: string;
  fullWidth?: boolean;
  renderTitleSkeleton?: boolean;
};

const Skeleton = ({
  className,
  fullWidth = false,
  renderTitleSkeleton,
}: TProps) => {
  const mdWidth = fullWidth ? "full" : "40";
  const skeletonClass = `w-32 h-40 sm:w-36 sm:h-48 md:w-${mdWidth} md:h-52 animate-pulse bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center`;
  const titleSkeletonClass =
    "w-20 h-4 sm:w-32 sm:h-5 md:w-40 md:h-6 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700";

  return <div className={clsx(skeletonClass, className)} />;
};

export default Skeleton;
