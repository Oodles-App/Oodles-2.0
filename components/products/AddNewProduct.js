import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProduct } from "../../redux/userProducts";
import ReactSelect from "react-select";

import { Paper, TextField, IconButton, Button, FormLabel } from "@mui/material";

import styles from "../../styles/ManageProducts.module.css";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

import { createAlert } from "../../redux/alerts";
import { fetchTags } from "../../redux/tags";

const AddNewProduct = ({ user }) => {
  const dispatch = useDispatch();
  const initialForm = {
    name: "",
    amount: 0,
  };

  const [formContent, setFormContent] = useState(initialForm);
  const [productTags, setProductTags] = useState([]);
  const [measurement, setMeasurement] = useState("");
  const [loading, setLoading] = useState(true);
  const allTags = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTags(user));
    setLoading(false);
  }, []);

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

    const productTagsConnect = productTags.map((tag) => {
      return { id: tag.id };
    });

    const newProduct = {
      ...formContent,
      measurement: measurement.value,
      tags: { connect: productTagsConnect },
      userId: user.id,
    };

    if (measurement === "") {
      dispatch(
        createAlert({
          message: "Failed to add product. Please input a measurement.",
        })
      );
      return;
    }
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
    setMeasurement("");
    setProductTags([]);
  };

  return (
    <div className={`mt-6 flex flex-col items-center ${styles.addWrapper}`}>
      <Paper
        className="flex flex-col items-center w-full p-5 relative"
        sx={{ maxWidth: 500 }}
      >
        <h1 className="text-2xl">Add Product</h1>

        <IconButton
          type="submit"
          onClick={handleFormSubmit}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <AddCircleOutline />
        </IconButton>
        <form
          onSubmit={handleFormSubmit}
          className="w-full mt-1 flex flex-col items-center"
        >
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
              <FormLabel>Measurement</FormLabel>
              <ReactSelect
                size="small"
                fullWidth
                name="measurement"
                options={[
                  { value: "individual", label: "individual" },
                  { value: "lbs", label: "lbs" },
                  { value: "bags", label: "bags" },
                  { value: "boxes", label: "boxes" },
                  { value: "cans", label: "cans" },
                ]}
                value={measurement}
                onChange={(measurementVal) => setMeasurement(measurementVal)}
              />
            </div>
            <div className={`${styles.formGroup} mb-4`}>
              <FormLabel>Categories</FormLabel>
              <ReactSelect
                isMulti={true}
                options={allTags}
                name="tags"
                className={`bg-slate-50`}
                value={productTags}
                sx={{ borderRadius: 1 }}
                onChange={(tags) => setProductTags(tags)}
              />
            </div>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default AddNewProduct;
