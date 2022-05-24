/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EditProduct from "./EditProduct";

import { fetchUserProducts } from "../../redux/userProducts";

import styles from "../../styles/ManageProducts.module.css";
import { Accordion, AccordionSummary, Paper } from "@mui/material";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

const ManageProducts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.userProducts);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchUserProducts(user));
    }
  }, []);

  return (
    <div className={`${styles.manageWrapper}`}>
      <Paper
        className="flex flex-col items-center w-full p-5 relative"
        sx={{ maxWidth: 500 }}
      >
        <h1 className="text-2xl">Your Listings</h1>
        {products.length === 0 ? (
          <div className={`text-center mt-2 ${styles.noProducts}`}>
            No products currently listed.
          </div>
        ) : (
          <div className={`${styles.listWrapper} mt-2`}>
            {products.map((product) => (
              <Accordion
                key={product.id}
                TransitionProps={{ unmountOnExit: true }}
                sx={{ backgroundColor: "#e2e2e2" }}
              >
                <AccordionSummary expandIcon={<ModeEditOutlinedIcon />}>
                  <div>
                    <div className="text-sm">
                      {product.amount} {product.measurement}
                    </div>
                    <div className="text-xl">
                      <strong>{product.name}</strong>
                    </div>
                  </div>
                </AccordionSummary>
                <EditProduct product={product} user={user} />
              </Accordion>
            ))}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ManageProducts;
