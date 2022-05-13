import * as Yup from "yup";

const userRegistrationSchema = Yup.object().shape({
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

export { userRegistrationSchema };
