import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  AccordionDetails,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import styles from "../../styles/ManageProducts.module.css";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

import { createAlert } from "../../redux/alerts";
import { deleteProduct, putProduct } from "../../redux/userProducts";

const EditProduct = ({ product, user }) => {
  const dispatch = useDispatch();
  const initialForm = {
    name: product.name,
    amount: product.amount,
    measurement: product.measurement,
  };
  const [formContent, setFormContent] = useState(initialForm);
  const [changes, setChanges] = useState(false);

  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
    setChanges(true);
  };

  const handleAmount = (operation) => {
    const oldAmount = formContent.amount;
    if (operation === "dec") {
      setFormContent({ ...formContent, amount: oldAmount - 1 });
    } else if (operation === "add") {
      setFormContent({ ...formContent, amount: oldAmount + 1 });
    }
    setChanges(true);
  };
  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId, user));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formContent.amount = Number(formContent.amount);

    if (isNaN(formContent.amount)) {
      dispatch(
        createAlert({
          message: "Failed to save changes. Please input a number for amount.",
        })
      );
      return;
    }

    if (formContent.name === "") {
      dispatch(
        createAlert({
          message: "Failed to save changes. Product name may not be empty.",
        })
      );
      return;
    }

    dispatch(putProduct({ ...formContent, id: product.id }, user));

    setChanges(false);
  };
  return (
    <AccordionDetails className="bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <div className="text-base">Edit Product</div>
          <div>
            <span className="text-rose-600 mt-6 text-xs">
              {changes && "Unsaved changes."}
            </span>
            <IconButton type="submit">
              <SaveAltIcon
                className={changes ? "font-bold text-xs text-rose-600" : ""}
              />
            </IconButton>
          </div>
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
          <div className="flex">
            <div className="w-1/2">
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
            <div className="w-1/2">
              <FormControl fullWidth>
                <Select
                  size="small"
                  fullWidth
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
              </FormControl>
            </div>
          </div>
        </div>
      </form>
      <button
        className="text-rose-600 mt-4"
        type="button"
        onClick={() => handleDelete(product.id)}
      >
        <span className="text-xs">Remove Item</span>
      </button>
    </AccordionDetails>
  );
};

export default EditProduct;
