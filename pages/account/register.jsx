import React, { useState, useEffect } from "react";
import getConfig from "next/config";

import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../../helpers/validationSchema";

import { Link } from "../../components";
import { Layout } from "../../components/account";
import { Spinner } from "../../components";

import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/user";
import { ImCancelCircle } from "react-icons/im";
import { editProfileTheme } from "../../styles/MuiThemes";
import { ThemeProvider } from "@mui/material";

import {
  TextField,
  Autocomplete,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import styles from "../../styles/Register.module.css";

export default Register;

function Register() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { publicRuntimeConfig } = getConfig();
  const baseUrl = `${publicRuntimeConfig.apiUrl}`;

  const formOptions = { resolver: yupResolver(userRegistrationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [businessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      const res = await fetch(`${baseUrl}/address/${address}`);
      const result = await res.json();
      setAddressSuggestions(
        result.features.map((location) => location.properties.formatted)
      );
    };
    if (address.length > 2) {
      fetchAddresses();
    }
  }, [address]);

  const onSubmit = (user) => {
    dispatch(postUser({ ...user, businessType, address }));
  };

  return (
    <Layout>
      <div
        className={
          businessType === ""
            ? `${styles.pageContainer}`
            : `${styles.pageContainer} ${styles.register}`
        }
      >
        <div className={styles.loginContainer}>
          <ThemeProvider theme={editProfileTheme}>
            <div
              className={`${styles.cardContainer} ${styles.registerContainer}`}
            >
              <div
                className={
                  businessType === ""
                    ? `${styles.card}`
                    : `${styles.card} ${styles.expand}`
                }
              >
                <h4 className={styles.cardHeader}>
                  <div>Register</div>
                  <Link href="/account/login" className={styles.link}>
                    <ImCancelCircle className={styles.centerVertical} />
                  </Link>
                </h4>
                <div className={styles.cardBody}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    id={styles.formContainer}
                  >
                    <FormControl className={styles.formGroup}>
                      <InputLabel id="select-label">Business Type</InputLabel>
                      <Select
                        label="Business Type"
                        id="select"
                        name="businessType"
                        fullWidth
                        value={businessType || ""}
                        onChange={(e) => setBusinessType(e.target.value)}
                      >
                        <MenuItem value="organization">Organization</MenuItem>
                        <MenuItem value="restaurant">Restaurant</MenuItem>
                      </Select>
                    </FormControl>
                    <div
                      className={styles.formGroup}
                      style={businessType === "" ? { display: "none" } : {}}
                    >
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
                    <div
                      className={styles.formGroup}
                      style={businessType === "" ? { display: "none" } : {}}
                    >
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
                    <div
                      className={styles.formGroup}
                      style={businessType === "" ? { display: "none" } : {}}
                    >
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
                    <div style={businessType === "" ? { display: "none" } : {}}>
                      <TextField
                        label="Phone Number"
                        name="contacNum"
                        type="text"
                        style={businessType === "" ? { display: "none" } : {}}
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
                    <div style={businessType === "" ? { display: "none" } : {}}>
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
                            autoComplete="one-time-code"
                            disabled={businessType === ""}
                          />
                        )}
                      />
                    </div>
                    <Button
                      variant="outlined"
                      type="submit"
                      disabled={businessType === ""}
                      className={styles.button}
                    >
                      {formState.isSubmitting ? <Spinner /> : "Register"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </div>
        <div className={`z-0 relative ${styles.imageContainer}`}>
          <Image
            src="/food_donation_box-01.svg"
            alt="Illustrated graphic of food donation."
            layout="fill"
          />
        </div>
      </div>
    </Layout>
  );
}
