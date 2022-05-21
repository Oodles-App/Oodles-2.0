import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { postProduct } from "../redux/userProducts";

import styles from "../styles/AddProduct.module.css";
import {
  Paper,
  AccordionClassKey,
  AccordionSummaryClassKey,
} from "@mui/material";

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
  const [product, setProduct] = useState("");

  const handleFormChange = (e) => {
    e.preventDefault();
  };

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
      <div className="flex flex-col items-center">
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            height: "auto",
            padding: "0px 10px",
            width: "80vw",
            maxWidth: "500px",
          }}
        >
          <div>Add Product</div>
        </Paper>
        <form onSubmit={handleFormSubmit} className={styles.form}>
          <div className={styles.children}>
            <label htmlFor="amount">Amount</label>
            <input
              name="amount"
              type="number"
              value={formState.amount}
              min={1}
              onInput={handleFormChange}
            />
          </div>

          <div className={styles.children}>
            <label htmlFor="measurement"></label>
            <select
              name="measurement"
              value={formState.measurement}
              onChange={handleFormChange}
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
              name="product"
              type="text"
              value={formState.product}
              onInput={handleFormChange}
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
      <div className="h-6 w-7"></div>
      <ManageProducts />
    </div>
  );
}
