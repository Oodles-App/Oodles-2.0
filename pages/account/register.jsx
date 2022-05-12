import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { Link } from "../../components";
import { Layout } from "../../components/account";
import { userService, alertService } from "../../services";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default Register;

function Register() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    businessName: Yup.string().required(
      "Please specify your business or organization name."
    ),
    contactNum: Yup.string().required("Please provide a contact phone number."),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const [businessType, setBusinessType] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);

  ///TODO: move this API call (address autocomplete API) to redux/ a services file?
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

  function onSubmit(user) {
    return userService
      .register({ ...user, businessType, address })
      .then((user) => {
        alertService.success("Registration successful", {
          keepAfterRouteChange: true,
        });
        router.push("login");
      })
      .catch(alertService.error);
  }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <label htmlFor="businessType"></label>
              </div>
              <select
                name="businessType"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">Register as:</option>
                <option value="organization">Organization</option>
                <option value="restaurant">Restaurant</option>
              </select>
            </div>

            <div className="form-group">
              <div>
                <TextField
                  label="Email"
                  name="email"
                  {...register("email")}
                  autoComplete="new-password"
                  disabled={businessType === ""}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
              </div>
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <div>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  disabled={businessType === ""}
                  {...register("password")}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div>
                <TextField
                  label="Business Name"
                  name="businessName"
                  type="text"
                  {...register("businessName")}
                  disabled={businessType === ""}
                />
              </div>
              <div className="invalid-feedback">
                {errors.businessName?.message}
              </div>
            </div>
            <div>
              <Autocomplete
                id="address-search"
                options={addressSuggestions}
                sx={{ width: 300 }}
                onSelect={(e) => setAddress(e.target.value)}
                freeSolo={true}
                disabled={businessType === ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Address"
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
            <div>
              <TextField
                label="Phone Number"
                name="contacNum"
                type="text"
                disabled={businessType === ""}
                {...register("contactNum")}
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
              />
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Register
            </button>
            <Link href="/account/login" className="btn btn-link">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
