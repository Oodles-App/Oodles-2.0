import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../../helpers/validationSchema";

import { Link } from "../../components";
import { Layout } from "../../components/account";
import { Spinner } from "../../components";

import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/user";
import { createAlert } from "../../redux/alerts";

import {
  TextField,
  Autocomplete,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import styles from "../../styles/Register.module.css";

export default Register;

function Register() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formOptions = { resolver: yupResolver(userRegistrationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [businessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  /// TODO: move this API call (address autocomplete API) to redux/ a services file?
  // TODO: render some sort of loading text or animation while data is fetching from API
  useEffect(() => {
    if (address.length > 2) {
      fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${address}&apiKey=589d58eb199f4f898d2194bfad9ec7b5`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .then((result) => {
          setAddressSuggestions(
            result.features.map((location) => location.properties.formatted)
          );
        })
        .catch((err) => console.log(err));
    }
  }, [address]);

  useEffect(() => {
    if (user.id) {
      dispatch(
        createAlert("success", "Registered successfully.", {
          id: "registration-success",
          autoClose: 5000,
          keepAfterRouteChange: true,
        })
      );
      router.push("edit-profile"); //TODO: replace with edit profile path when component is created
    } else if (user.error) {
      dispatch(
        createAlert("error", user.error, {
          id: "registration-failed",
          autoClose: false,
          keepAfterRouteChange: false,
        })
      );
    }
  }, [user, router, dispatch]);

  const onSubmit = (user) => {
    dispatch(postUser({ ...user, businessType, address }));
  };

  return (
    <Layout>
      <div className={styles.card}>
        <h4 className={styles.cardHeader}>Register</h4>
        <div>
          <InputLabel htmlFor="businessType">Business Type</InputLabel>
          <Select
            labelId="select-label"
            name="businessType"
            fullWidth
            value={businessType || ""}
            onChange={(e) => setBusinessType(e.target.value)}
          >
            <MenuItem value="organization">Organization</MenuItem>
            <MenuItem value="restaurant">Restaurant</MenuItem>
          </Select>
        </div>
        <div className={styles.cardBody}>
          <form onSubmit={handleSubmit(onSubmit)} id={styles.formContainer}>
            <div className={styles.formGroup}>
              <TextField
                label="Email"
                name="email"
                {...register("email")}
                autoComplete="new-password"
                disabled={businessType === ""}
                className={
                  errors.email
                    ? `${styles.formControl} ${styles.isInvalid}`
                    : `${styles.formControl}`
                }
              />
              <div className={styles.invalidFeedback}>
                {errors.email?.message}
              </div>
            </div>
            <div className={styles.formGroup}>
              <TextField
                label="Password"
                name="password"
                type="password"
                disabled={businessType === ""}
                {...register("password")}
                className={
                  errors.password
                    ? `${styles.formControl} ${styles.isInvalid}`
                    : `${styles.formControl}`
                }
              />
              <div className={styles.invalidFeedback}>
                {errors.password?.message}
              </div>
            </div>
            <div className={styles.formGroup}>
              <TextField
                fullWidth={true}
                label="Business Name"
                name="businessName"
                type="text"
                {...register("businessName")}
                disabled={businessType === ""}
                className={
                  errors.businessName
                    ? `${styles.formControl} ${styles.isInvalid}`
                    : `${styles.formControl}`
                }
              />

              <div className={styles.invalidFeedback}>
                {errors.businessName?.message}
              </div>
            </div>
            <div>
              <TextField
                label="Phone Number"
                name="contacNum"
                type="text"
                disabled={businessType === ""}
                {...register("contactNum")}
                className={
                  errors.contactNum
                    ? `${styles.formControl} ${styles.isInvalid}`
                    : `${styles.formControl}`
                }
              />
              <div className={styles.invalidFeedback}>
                {errors.contactNum?.message}
              </div>
            </div>
            <div>
              <Autocomplete
                id="address-search"
                fullWidth={true}
                options={addressSuggestions}
                onSelect={(e) => setAddress(e.target.value)}
                freeSolo={true}
                disabled={businessType === ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Address"
                    className={styles.autocompletePadding}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                    value={address}
                    autoComplete="new-password"
                    disabled={businessType === ""}
                  />
                )}
              />
            </div>
            <Button variant="outlined" type="submit">
              {formState.isSubmitting ? <Spinner /> : "Register"}
            </Button>
            <Link href="/account/login" className={styles.cancel}>
              &times; Cancel
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
