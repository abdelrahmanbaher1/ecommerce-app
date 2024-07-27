"use client";

import React, { Suspense, useEffect, useState } from "react";
import { TNavDepartment } from "@/lib/types";
import LogoIcon from "../common/Logo";
import Link from "next/link";
import useAppContext from "@/core/contexts/AppContext";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "../ThemeSwitcher";
import Search from "../Search";
import MobileNavBar from "./MobileNavBar";

import Cart from "./Cart";
import LanguageSwitcher from "./LanguageSwitcher";

type TProps = {
  navigationData: TNavDepartment[];
};

const Navbar = ({ navigationData }: TProps) => {
  const { locale } = useAppContext();
  const [currentTabId, setCurrentTabId] = useState<TNavDepartment>(
    navigationData[0]
  );

  useEffect(() => {
    localStorage.setItem(
      "CurrentTab",
      JSON.stringify({
        name: currentTabId.name,
        id: currentTabId.id,
      })
    );
  }, [currentTabId]);

  return (
    <nav className="relative flex items-center justify-between lg:px-6">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileNavBar navigationData={navigationData} />
        </Suspense>
      </div>
      <Link href="/">
        <LogoIcon width="50" height="50" />
      </Link>
      <div className="flex gap-1.5 items-center sm:hidden">
        <ThemeSwitcher />
        <Cart />
        {/* <LanguageSwitcher /> */}
      </div>

      <div className="hidden md:flex w-full items-center">
        <ul className=" gap-6 text-sm md:flex md:items-center">
          {navigationData.slice(0, 6).map((item: TNavDepartment) => (
            <li key={item.id}>
              <Link
                className="uppercase group rounded-lg border border-transparent px-3 py-3 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                href={`/${locale}/category/${item.name}-${item.id}`}
                onClick={() => setCurrentTabId(item)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden xl:flex items-center justify-center lg:w-1/3 gap-5">
        <Search />
        <ThemeSwitcher />
        <Cart />
      </div>
    </nav>
  );
};

export default Navbar;
