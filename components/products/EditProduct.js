import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  AccordionDetails,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import styles from "../../styles/ManageProducts.module.css";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

import { createAlert } from "../../redux/alerts";
import { deleteProduct } from "../../redux/userProducts";

const EditProduct = ({ product, user }) => {
  const dispatch = useDispatch();
  const initialForm = {
    name: product.name,
    amount: product.amount,
    measurement: product.measurement,
  };
  const [formContent, setFormContent] = useState(initialForm);
  console.log(formContent, "form");
  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };
  const handleAmount = (operation) => {
    const oldAmount = formContent.amount;
    console.log(oldAmount, "oldAmount");
    console.log(oldAmount - 1, "decrement of old Amount");
    if (operation === "dec") {
      console.log("OPERATION IS DEC");
      setFormContent({ ...formContent, amount: oldAmount - 1 });
    } else if (operation === "add") {
      console.log("OPERATION IS ADD");
      setFormContent({ ...formContent, amount: oldAmount + 1 });
    }
  };
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId, user));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formContent.amount = Number(formContent.amount);
    console.log(formContent.amount, "form content about after numbering");
    if (isNaN(formContent.amount)) {
      console.log("hit NaN");
      dispatch(
        createAlert({
          message: "Failed to save changes. Please input a number for amount.",
        })
      );
      return;
    }
    console.log(formContent, "form before submission");
    console.log(e);
  };
  return (
    <AccordionDetails className="bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div className="text-base">Edit Product</div>
          <IconButton type="submit">
            <SaveAltIcon />
          </IconButton>
        </div>
        <hr className="flex-grow border-t border-gray-2000 mb-4 border-2" />
        <div className={styles.form}>
          <TextField
            size="small"
            name="name"
            type="text"
            value={formContent.name}
            placeholder="Product Name"
            fullWidth
            onChange={handleFormChange}
          />
          <div className="flex justify-between">
            <div>
              <Button
                type="button"
                variant="outlined"
                style={{
                  maxWidth: "30px",
                  maxHeight: "100%",
                  minWidth: "30px",
                  minHeight: "40px",
                  borderBottomRightRadius: "0",
                  borderTopRightRadius: "0",
                }}
                fullWidth
                className={styles.incButton}
                onClick={() => handleAmount("dec")}
              >
                <RemoveCircleOutline fontSize="small" />
              </Button>

              <TextField
                size="small"
                name="amount"
                className={styles.numberInput}
                InputProps={{ min: 0 }}
                value={formContent.amount}
                onChange={handleFormChange}
                placeholder="Qty."
              />
              <Button
                type="button"
                variant="outlined"
                style={{
                  maxWidth: "30px",
                  maxHeight: "100%",
                  minWidth: "30px",
                  minHeight: "40px",
                  borderBottomLeftRadius: "0",
                  borderTopLeftRadius: "0",
                }}
                className={styles.incButton}
                onClick={() => handleAmount("add")}
              >
                <AddCircleOutline fontSize="small" />
              </Button>
            </div>
            <div>
              <Select
                size="small"
                name="measurement"
                value={formContent.measurement}
                onChange={handleFormChange}
              >
                <MenuItem value="individual">individual</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
                <MenuItem value="bags">bags</MenuItem>
                <MenuItem value="boxes">boxes</MenuItem>
                <MenuItem value="cans">cans</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      </form>
      <button
        className="text-rose-600 mt-6"
        type="button"
        onClick={() => handleDelete(product.id)}
      >
        <span className="text-xs">Remove Item</span>
      </button>
    </AccordionDetails>
  );
};

export default EditProduct;
