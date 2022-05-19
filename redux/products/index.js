//Redux for managing ONE user's products

import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/products`;

const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products,
  };
};

const removeProduct = (productId) => {
  return { type: REMOVE_PRODUCT, productId };
};

export const fetchUserProducts = (user) => {
  return async function (dispatch) {
    const products = await fetchWrapper.get(baseUrl, user);
  };
};

export default function productsReducer(products = [], action) {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return products.filter((product) => product.id !== action.id);
    case GET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
}
