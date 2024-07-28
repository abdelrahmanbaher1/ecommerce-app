"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { AppContextProvider } from "@/core/contexts/AppContext";
import { TLocale, TNavDepartment } from "@/lib/types";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React from "react";

type TProps = {
  navigationData: TNavDepartment[];
  children: React.ReactNode;
  params: { locale: TLocale };
};

const LayoutClient = ({ navigationData, params, children }: TProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000,
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        reportError(error);
      },
    }),
  });
  return (
    <AppContextProvider theme="light" locale={params.locale}>
      <QueryClientProvider client={queryClient}>
        <Navbar navigationData={navigationData} />
        {children}
        <Footer />
      </QueryClientProvider>
    </AppContextProvider>
  );
};

export default LayoutClient;
