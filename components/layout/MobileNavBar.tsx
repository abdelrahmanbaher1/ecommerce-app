import React, { useRef, useState } from "react";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Sheet,
} from "../ui/sheet";
import { TNavDepartment } from "@/lib/types";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";

const MobileNavBar = ({
  navigationData,
}: {
  navigationData: TNavDepartment[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick({
    callback: () => {
      setIsOpen(false);
    },
    ref,
  });

  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Bars3Icon
            width={24}
            height={24}
            strokeWidth={2}
            className="hover:cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="overflow-y-scroll w-1/2 "
          ref={ref}
        >
          <SheetHeader className="text-xl">Categories</SheetHeader>
          <ul className="flex flex-col gap-3 mt-5">
            {navigationData.slice(0, 6).map((navData, index) => (
              <Link
                href={`/category/${navData.name}-${navData.id}`}
                className="flex justify-center py-2 border rounded-lg text-xl font-bold text-black transition-colors hover:text-neutral-500 dark:text-gray-700 dark:hover:text-white "
                key={navData.name}
                onClick={() => setIsOpen(false)}
              >
                {navData.name}
              </Link>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavBar;
