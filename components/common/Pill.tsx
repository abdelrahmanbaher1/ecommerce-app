import React from "react";

type TProps = {
  pillItem: any;
};

const Pill = ({ pillItem }: TProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700">
        {pillItem}
      </span>
    </div>
  );
};

export default Pill;
