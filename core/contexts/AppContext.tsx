"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

import { TCartItem, TLocale, TTheme } from "@/lib/types";
import { getLocaleConfig } from "@/lib/helpers/locale";

type TProps = {
  children: React.ReactNode;
  locale: TLocale;
  theme: TTheme;
};

type TContext = {
  locale: TLocale;
  theme: TTheme;
  isEnglish: boolean;
  isArabic: boolean;
  textDir: "ltr" | "rtl";
  cartItems: TCartItem[];
  addToCart: (product: TCartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const AppContext = React.createContext<TContext | null>(null);
// Load cart items from localStorage
const loadCartFromLocalStorage = (): TCartItem[] => {
  if (typeof window === "undefined") return []; // Prevent server-side rendering issues

  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};
// Save cart items to localStorage
const saveCartToLocalStorage = (cartItems: TCartItem[]) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
type TAction =
  | { type: "ADD_TO_CART"; product: TCartItem }
  | { type: "REMOVE_FROM_CART"; productId: number }
  | { type: "CLEAR_CART" };

const cartReducer = (state: TCartItem[], action: TAction): TCartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.product.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      return [
        ...state,
        { ...action.product, quantity: 1, variant: action.product.variant },
      ];
    }
    case "REMOVE_FROM_CART": {
      return state.filter((item) => item.id !== action.productId);
    }
    case "CLEAR_CART": {
      return [];
    }
    default:
      return state;
  }
};

export const AppContextProvider = ({ children, locale, theme }: TProps) => {
  const localeConfig = useMemo(() => getLocaleConfig(locale), [locale]);
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    [],
    loadCartFromLocalStorage
  );
  useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const addToCart = useCallback(
    (product: TCartItem) => {
      dispatch({ type: "ADD_TO_CART", product });
    },
    [dispatch]
  );
  const removeFromCart = useCallback(
    (productId: number) => {
      dispatch({ type: "REMOVE_FROM_CART", productId });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, [dispatch]);

  return (
    <AppContext.Provider
      value={{
        locale,
        theme,
        ...localeConfig,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () =>
  React.useContext(AppContext as React.Context<TContext>);

export default useAppContext;
