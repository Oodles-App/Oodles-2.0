import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user";

import { Link } from "../../components";
import { Layout } from "../../components/account";
import { userService, alertService } from "../../services";
import { useEffect } from "react";

export default Login;

function Login() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ email, password }) {
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (user.id) {
      // get return url from query parameters or default to '/'
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
    } else if (user.error) {
      alertService.error;
    }
  }, [user, router]);

  // function onSubmit({ email, password }) {
  //   return userService
  //     .login(email, password)
  //     .then(() => {
  //       // get return url from query parameters or default to '/'
  //       const returnUrl = router.query.returnUrl || "/";
  //       router.push(returnUrl);
  //     })
  //     .catch(alertService.error);
  // }

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            <Link href="/account/register" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
