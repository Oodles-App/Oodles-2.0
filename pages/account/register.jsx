import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { userRegistrationSchema } from "../../helpers/validationSchema";

import { Link } from "../../components";
import { Layout } from "../../components/account";

import { useDispatch, useSelector } from "react-redux";
import { postUser } from "../../redux/user";
import { createAlert } from "../../redux/alerts";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

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
      router.push("/"); //TODO: replace with edit profile path when component is created
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
