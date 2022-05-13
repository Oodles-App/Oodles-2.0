import * as Yup from "yup";

const editOrgProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  businessName: Yup.string().required(
    "Please specify your business or organization name."
  ),
  contactNum: Yup.string().required("Please provide a contact phone number."),
  biography: Yup.string(),
});

export { editOrgProfileSchema };
