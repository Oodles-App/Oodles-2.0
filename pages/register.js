import React, { useState } from "react";
import { Autocomplete } from "@lob/react-address-autocomplete";

/*TODO:
    - UX: Auto-complete address feature
*/

const Register = () => {
  const initialForm = {
    email: "",
    password: "",
    businessName: "",
    address: "",
    contactNum: "",
  };

  const [orgType, setOrgType] = useState("");
  const [formContent, setFormContent] = useState(initialForm);

  const handleFormChange = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Form will be submitted as an ${orgType} with content:`);
    console.log(formContent);
  };

  return (
    <div>
      <h1>Register</h1>
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
          <div>
            <label htmlFor="businessName">Business Name:</label>
          </div>
          <input
            name="businessName"
            type="text"
            value={formContent.businessName}
            required
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <div>
            <label htmlFor="email">Email:</label>
          </div>
          <input
            name="email"
            type="email"
            value={formContent.email}
            required
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <div>
            <label htmlFor="address">Address:</label>
          </div>
          <input
            name="address"
            type="text"
            value={formContent.address}
            required
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <div>
            <label htmlFor="password">Password:</label>
          </div>
          <input
            name="password"
            type="password"
            value={formContent.password}
            required
            disabled={orgType === ""}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <div>
            <label htmlFor="contactNum">Phone Number:</label>
          </div>
          <input
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
