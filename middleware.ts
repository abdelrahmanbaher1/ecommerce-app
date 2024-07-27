import { NextResponse } from "next/server";
import type {
  NextRequest as TNextRequest,
  NextResponse as TNextResponse,
} from "next/server";
import {
  IsPathnameMissingLocale,
  getLocale,
  getLocaleConfig,
} from "./lib/helpers/locale";
import { LOCALES } from "./lib/helpers/constants";

export const middleware = (request: TNextRequest) => {
  const { pathname } = new URL(request.url);
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request.url);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // e.g. incoming request is /products
  // The new URL is now /en/products

  return NextResponse.redirect(request.nextUrl, { status: 308 });
};

export const config = {
  matcher: ["/((?!_next).*)"],
};
