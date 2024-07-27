// "use client";

// import { Dialog, Transition } from "@headlessui/react";
// import Link from "next/link";
// import { usePathname, useSearchParams } from "next/navigation";
// import { Fragment, Suspense, useEffect, useState } from "react";

// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { TNavDepartment } from "@/lib/types";
// import Search, { SearchSkeleton } from "../Search";

// export default function MobileNavBar({
//   navigationData,
// }: {
//   navigationData: TNavDepartment[];
// }) {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [isOpen, setIsOpen] = useState(false);
//   const openMobileMenu = () => setIsOpen(true);
//   const closeMobileMenu = () => setIsOpen(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 768) {
//         setIsOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [isOpen]);

//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname, searchParams]);

//   return (
//     <>
//       <button
//         onClick={openMobileMenu}
//         aria-label="Open mobile menu"
//         className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
//       >
//         <Bars3Icon className="h-4" />
//       </button>
//       <Transition show={isOpen}>
//         <Dialog onClose={closeMobileMenu} className="relative z-50">
//           <Transition.Child
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="opacity-0 backdrop-blur-none"
//             enterTo="opacity-100 backdrop-blur-[.5px]"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="opacity-100 backdrop-blur-[.5px]"
//             leaveTo="opacity-0 backdrop-blur-none"
//           >
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//           </Transition.Child>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="translate-x-[-100%]"
//             enterTo="translate-x-0"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="translate-x-0"
//             leaveTo="translate-x-[-100%]"
//           >
//             <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
//               <div className="p-4">
//                 <button
//                   className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
//                   onClick={closeMobileMenu}
//                   aria-label="Close mobile menu"
//                 >
//                   <XMarkIcon className="h-6" />
//                 </button>

//                 <div className="mb-4 w-full">
//                   <Suspense fallback={<SearchSkeleton />}>
//                     <Search />
//                   </Suspense>
//                 </div>
//                 {navigationData.length ? (
//                   <ul className="flex w-full flex-col">
//                     {navigationData.map((item: TNavDepartment) => (
//                       <li
//                         className="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
//                         key={item.id}
//                       >
//                         <Link
//                           href={item.name}
//                           prefetch={true}
//                           onClick={closeMobileMenu}
//                         >
//                           {item.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : null}
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

import React, { useRef, useState } from "react";

import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sheet,
} from "../ui/sheet";
import { Button } from "../ui/button";
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
      <Sheet>
        <SheetTrigger asChild>
          <Bars3Icon
            width={24}
            height={24}
            strokeWidth={2}
            className="hover:cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-scroll w-1/2 ">
          <SheetHeader className="text-xl">Categories</SheetHeader>
          <ul className="flex flex-col gap-3 mt-5">
            {navigationData.map((navData, index) => (
              <Link
                href={`/category/${navData.name}-${navData.id}`}
                className="flex justify-center py-2 border rounded-lg text-xl font-bold text-black transition-colors hover:text-neutral-500 dark:text-gray-700 dark:hover:text-white "
                key={navData.name}
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
