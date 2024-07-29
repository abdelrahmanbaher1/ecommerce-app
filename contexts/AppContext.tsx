"use client";

import React, { useCallback, useEffect, useMemo, useReducer } from "react";

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
  cartItems: TCartItem[];
  addToCart: (product: TCartItem) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  isMobile: boolean;
  // @TODO : Add this later with filters
  // minPrice: string;
  // maxPrice: string;
  // setMinPrice: (minPrice: string) => void;
  // setMaxPrice: (maxPrice: string) => void;
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

type TState = {
  cartItems: TCartItem[];
};

const initialState: TState = {
  cartItems: loadCartFromLocalStorage(),
};

const cartReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.product.id
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, cartItems: updatedItems };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.productId
        ),
      };
    }
    case "CLEAR_CART": {
      return { ...state, cartItems: [] };
    }

    default:
      return state;
  }
};

export const AppContextProvider = ({ children, locale, theme }: TProps) => {
  const localeConfig = useMemo(() => getLocaleConfig(locale), [locale]);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    saveCartToLocalStorage(state.cartItems);
  }, [state.cartItems]);

  const { innerHeight: height, innerWidth: width } = global;

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
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        isMobile: width < 800,
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
