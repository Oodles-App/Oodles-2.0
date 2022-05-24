import React from "react";
import { useSelector } from "react-redux";
import AddNewProduct from "../components/products/AddNewProduct";

import ManageProducts from "../components/products/ManageProducts";
import styles from "../styles/ManageProducts.module.css";

export default function AddProduct() {
  const user = useSelector((state) => state.user);
  return (
    <div className={`flex flex-col gap-6 ${styles.flexWrapper}`}>
      <AddNewProduct user={user} />
      <ManageProducts />
    </div>
  );
}
