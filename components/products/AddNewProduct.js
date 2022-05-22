import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postProduct } from "../../redux/userProducts";

import {
  Paper,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
} from "@mui/material";

import styles from "../../styles/ManageProducts.module.css";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

import { createAlert } from "../../redux/alerts";

const AddNewProduct = ({ user }) => {
  const dispatch = useDispatch();
  const initialForm = {
    name: "",
    amount: 0,
    measurement: "",
  };
  const [formContent, setFormContent] = useState(initialForm);

  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };

  const handleAmount = (operation) => {
    const oldAmount = Number(formContent.amount);
    if (isNaN(oldAmount)) {
      dispatch(
        createAlert({
          message: "Please input a number for amount.",
        })
      );
      return;
    }

    if (operation === "dec") {
      setFormContent({ ...formContent, amount: oldAmount - 1 });
    } else if (operation === "add") {
      setFormContent({ ...formContent, amount: oldAmount + 1 });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formContent.amount = Number(formContent.amount);

    const newProduct = {
      ...formContent,
      userId: user.id,
    };
    if (isNaN(formContent.amount)) {
      dispatch(
        createAlert({
          message: "Failed to add product. Please input a number for amount.",
        })
      );
      return;
    }

    if (formContent.name === "") {
      dispatch(
        createAlert({
          message: "Failed to add product. Product name may not be empty.",
        })
      );
      return;
    }
    dispatch(postProduct(newProduct, user));
    setFormContent(initialForm);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-2xl">Add Product</h1>
      <Paper
        className="flex items-center w-4/5 p-5 relative"
        sx={{ maxWidth: 500 }}
      >
        <IconButton
          type="submit"
          onClick={handleFormSubmit}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <AddCircleOutline />
        </IconButton>
        <form onSubmit={handleFormSubmit} className="w-full mt-1">
          <div className={styles.form}>
            <div>
              <FormLabel>Product Name</FormLabel>
              <TextField
                size="small"
                name="name"
                type="text"
                value={formContent.name}
                fullWidth
                onChange={handleFormChange}
              />
            </div>
            <div>
              <FormLabel>Amount</FormLabel>
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
            </div>
            <div>
              <FormControl fullWidth>
                <FormLabel>Measurement</FormLabel>
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
        </form>
      </Paper>
    </div>
  );
};

export default AddNewProduct;
