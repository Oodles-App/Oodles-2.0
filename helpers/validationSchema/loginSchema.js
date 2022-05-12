import * as Yup from "yup";

const userLoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export { userLoginSchema };
