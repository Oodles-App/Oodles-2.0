//Redux for managing ONE user's products

import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}`;

const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const SET_PRODUCTS = "SET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

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

const editProduct = (updatedProduct) => {
  return {
    type: EDIT_PRODUCT,
    updatedProduct,
  };
};

export const postProduct = (newProduct, user) => {
  return async function (dispatch) {
    const product = await fetchWrapper.post(
      `${baseUrl}/products`,
      newProduct,
      user
    );
    dispatch(addProduct(product));
  };
};

export const deleteProduct = (id, user) => {
  return async function (dispatch) {
    await fetchWrapper._delete(`${baseUrl}/products/${id}`, user);
    dispatch(removeProduct(id));
  };
};

export const putProduct = (product, user) => {
  return async function (dispatch) {
    const updatedProduct = await fetchWrapper.put(
      `${baseUrl}/products/${product.id}`,
      user,
      product
    );
    dispatch(editProduct(updatedProduct));
  };
};

export const fetchUserProducts = (user) => {
  return async function (dispatch) {
    const products = await fetchWrapper.get(
      `${baseUrl}/users/${user.id}/products`,
      user
    );
    dispatch(setProducts(products));
  };
};

export default function userProductsReducer(products = [], action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...products, action.product];
    case REMOVE_PRODUCT:
      return products.filter((product) => product.id !== action.productId);
    case EDIT_PRODUCT:
      const newProducts = products.map((product) => {
        if (product.id === action.updatedProduct.id) {
          return action.updatedProduct;
        } else {
          return product;
        }
      });
      return newProducts;
    case SET_PRODUCTS:
      return action.products;
    default:
      return products;
  }
}
