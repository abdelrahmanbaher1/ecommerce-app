import React, { Suspense, useEffect, useState } from "react";
import { TNavDepartment } from "@/lib/types";
import LogoIcon from "../common/Logo";
import Link from "next/link";
import useAppContext from "@/core/contexts/AppContext";
import ThemeSwitcher from "../common/ThemeSwitcher";
import MobileNavBar from "./MobileNavBar";

import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";

type TProps = {
  navigationData: TNavDepartment[];
};

const Navbar = ({ navigationData }: TProps) => {
  const { locale } = useAppContext();
  return (
    <nav className="relative flex items-center justify-between lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileNavBar navigationData={navigationData} />
        </Suspense>
      </div>
      <Link
        href="/"
        className="max-sm:absolute max-sm:top-1/2 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:-translate-y-1/2"
      >
        <LogoIcon width="50" height="50" />
      </Link>
      <div className="flex gap-1.5 items-center sm:hidden">
        <ThemeSwitcher />
        <Cart />
        {/* <LanguageSwitcher />  // @TODO : Add this Later */}
      </div>

      <div className="hidden md:flex w-full items-center">
        <ul className=" gap-6 text-sm md:flex md:items-center">
          {navigationData.slice(0, 6).map((item: TNavDepartment) => (
            <li key={item.id}>
              <Link
                className="uppercase group rounded-lg border border-transparent px-3 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                href={`/${locale}/category/${item.name}-${item.id}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden sm:flex items-center justify-center gap-5">
        {/* <Search />  // @TODO : Add this Later */}
        <ThemeSwitcher />
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
