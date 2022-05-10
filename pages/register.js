import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Register = () => {
  const initialForm = {
    email: "",
    password: "",
    businessName: "",
    contactNum: "",
  };

  const [orgType, setOrgType] = useState("");
  const [address, setAddress] = useState("");
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [formContent, setFormContent] = useState(initialForm);

  const step1 =
    "Please indicate whether you are registering as an organization or a restaurant.";
  const step2 = "Please fill out your details (all fields are required.";

  //TODO: move this API call to redux? & Manage suggestions in Redux state?
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

  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Form will be submitted as an ${orgType} with content:`);
    console.log({ orgType, address, ...formContent });
  };

  return (
    <div>
      <h3>{orgType === "" ? step1 : step2}</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <div>
            <label htmlFor="orgType"></label>
          </div>
          <select
            name="orgType"
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
          >
            <option value="">Register as:</option>
            <option value="organization">Organization</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>

        <div>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formContent.email}
            required
            autoComplete="new-password"
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formContent.password}
            required
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <TextField
            label="Business Name"
            name="businessName"
            type="text"
            value={formContent.businessName}
            required
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <Autocomplete
            id="address-search"
            options={addressSuggestions}
            sx={{ width: 300 }}
            onSelect={(e) => setAddress(e.target.value)}
            freeSolo={true}
            disabled={orgType === ""}
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
                disabled={orgType === ""}
              />
            )}
          />
        </div>

        <div>
          <TextField
            label="Phone Number"
            name="contactNum"
            type="text"
            value={formContent.contactNum}
            required
            maxLength={10}
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <button type="submit" disabled={orgType === ""}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
