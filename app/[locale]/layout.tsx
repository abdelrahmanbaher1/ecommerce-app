import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { getNavigationData } from "@/services/CommonService";
import LayoutClient from "./LayoutClient";
import { TLocale } from "@/lib/types";
import { getLocaleConfig } from "@/lib/helpers/locale";
import { Providers } from "../providers/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

type TProps = {
  children: React.ReactNode;
  params: { locale: TLocale };
};

export const metadata: Metadata = {
  title: "WeBook Task",
  description: "Simpl E-Commerce Website",
};

export default async function RootLayout({ children, params }: TProps) {
  const { locale } = params;
  const { textDir } = getLocaleConfig(locale);

  const navigationData = await getNavigationData();

  return (
    <html dir={textDir} lang={locale} suppressHydrationWarning>
      <body
        className="bg-slate-50 dark:bg-stone-950 p-3 sm:p-4"
        style={{ color: "rgb(var(--foreground-rgb))" }}
      >
        <Toaster />
        <Providers>
          <LayoutClient navigationData={navigationData} params={params}>
            {children}
          </LayoutClient>
        </Providers>
      </body>
    </html>
  );
}
