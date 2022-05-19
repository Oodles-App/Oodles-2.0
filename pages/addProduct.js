import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { postProduct } from "../redux/userProducts";

import ManageProducts from "../components/products/ManageProducts";

export default function AddProduct() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm();
  const user = useSelector((state) => state.user);
  const [amount, setAmount] = useState(0);
  const [measurement, setMeasurement] = useState("");
  const [product, setProduct] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      amount: amount,
      measurement: measurement,
      name: product,
      userId: user.id,
    };
    dispatch(postProduct(newProduct, user));
    // try {
    //   fetch("./api/products/addProduct", {
    //     body: JSON.stringify({
    //       product: {
    //         amount: amount,
    //         measurement: measurement,
    //         name: product,
    //         userId: user.id,
    //       },
    //     }),
    //     method: "POST",
    //   });
    // } catch (error) {
    //   console.log("error in creating new product", error);
    // }
  };

  return (
    <div>
      <div>
        <h1>Add Product</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              value={amount}
              onInput={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
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

          <div>
            <label htmlFor="product">Product</label>
            <input
              type="text"
              value={product}
              onInput={(e) => setProduct(e.target.value)}
            />
          </div>

          <button type="submit" disabled={product === ""}>
            Add Product
          </button>
        </form>
      </div>
      <ManageProducts />
    </div>
  );
}
