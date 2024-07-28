const API_BASE_URL = "https://api.escuelajs.co/api/v1/";

const REACT_QUERY_KEYS = {
  GET_ALL_PRODUCTS: "getAllProducts",
  GET_ALL_CATEGORIES: "getAllCategories",
  GET_PRODDUCT_DETAILS: "getOneProduct",
};

const LOCALES = ["en", "ar"];

const PRODUCT_VARIANTS = ["S", "M", "L", "XL", "2XL"];

enum ERRORVIEW {
  GENERIC_ERROR = "generic",
  EMPTY_CATEGORY = "Empty_Category",
  EMPTY_CART = "Empty_Cart",
  EMPTY_PRODUCT = "Empty_Product",
}

enum PRODUCT_BOX_VARIANT {
  FULL = "full",
  CAROUSEL = "carousel",
  CART = "cart",
}

export {
  API_BASE_URL,
  REACT_QUERY_KEYS,
  PRODUCT_VARIANTS,
  LOCALES,
  ERRORVIEW,
  PRODUCT_BOX_VARIANT,
};
