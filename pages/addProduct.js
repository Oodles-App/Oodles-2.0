import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { postProduct } from "../redux/userProducts";

import styles from "../styles/AddProduct.module.css";

import ManageProducts from "../components/products/ManageProducts";

export default function AddProduct() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialForm = {
    amount: 0,
    measurement: "",
    name: "",
  };

  const [formState, setFormState] = useState(initialForm);
  const [amount, setAmount] = useState(0);
  const [measurement, setMeasurement] = useState("");
  const [product, setProduct] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formState,
      userId: user.id,
    };
    dispatch(postProduct(newProduct, user));
    setFormState(initialForm);
  };

  return (
    <div>
      <div className={styles.center}>
        <h1>Add Product</h1>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.children}>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={amount}
              min={1}
              onInput={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className={styles.children}>
            <label htmlFor="measurement"></label>
            <select
              name="measurement"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
            >
              <option value="">Choose measurement</option>
              <option value="lbs">lbs</option>
              <option value="individual">individual</option>
              <option value="bags">bags</option>
              <option value="boxes">boxes</option>
              <option value="cans">cans</option>
            </select>
          </div>

          <div className={styles.children}>
            <label htmlFor="product">Product</label>
            <input
              type="text"
              value={product}
              onInput={(e) => setProduct(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={product === ""}
            className={styles.button}
          >
            Add Product
          </button>
        </form>
      </div>
      <ManageProducts />
    </div>
  );
}
