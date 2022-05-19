//Redux for managing ONE user's products

import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  };
};
const removeProduct = (productId) => {
  return {
    type: REMOVE_PRODUCT,
    productId,
  };
};

export const postProduct = (newProduct, user) => {
  return async function (dispatch) {
    const product = await fetchWrapper.post(
      `${baseUrl}/products`,
      newProduct,
      user
    );
    console.log(product);
    dispatch(addProduct(product));
  };
};

export const fetchUserProducts = (user) => {
  return async function (dispatch) {
    const products = await fetchWrapper.get(
      `${baseUrl}/users/${user.id}/products`,
      user
    );
    console.log(products);
    dispatch(setProducts(products));
  };
};

export default function userProductsReducer(products = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...products, action.product];
    case REMOVE_PRODUCT:
      return products.filter((product) => product.id !== action.id);
    case SET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
}
