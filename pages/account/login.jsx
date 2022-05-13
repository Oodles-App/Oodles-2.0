import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "../../helpers/validationSchema";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user";
import { createAlert } from "../../redux/alerts";
import { setUser } from "../../redux/user";

import { Link } from "../../components";
import { Layout } from "../../components/account";
import { useEffect } from "react";

export default Login;

function Login() {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const formOptions = { resolver: yupResolver(userLoginSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit({ email, password }) {
    dispatch(login(email, password));
  }

  useEffect(() => {
    if (user.id) {
      // get return url from query parameters or default to homepage: '/'
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
    } else if (user.error) {
      dispatch(
        createAlert("error", user.error, {
          id: "invalid-credentials",
          autoClose: false,
          keepAfterRouteChange: false,
        })
      );
    }
    const clearUserErrorOnRouteChange = () => {
      if (user.error) {
        dispatch(setUser({}));
      }
    };
    router.events.on("routeChangeStart", clearUserErrorOnRouteChange);

    return () => {
      router.events.off("routeChangeStart", clearUserErrorOnRouteChange);
    };
  }, [user, router, dispatch]);

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
