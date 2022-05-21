import React from "react";
import { useSelector } from "react-redux";
import AddNewProduct from "../components/products/AddNewProduct";

import ManageProducts from "../components/products/ManageProducts";

export default function AddProduct() {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col gap-6">
      <AddNewProduct user={user} />
      <ManageProducts />
    </div>
  );
}
