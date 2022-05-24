/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { userLoginSchema } from "../../helpers/validationSchema";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user";
import { createAlert } from "../../redux/alerts";
import { setUser } from "../../redux/user";

import { Spinner } from "../../components";
import { Link } from "../../components";
import { Layout } from "../../components/account";

import { useEffect } from "react";

import Image from "next/image";
import { TextField, Button } from "@mui/material";
import { editProfileTheme } from "../../styles/MuiThemes";
import { ThemeProvider } from "@mui/material";
import styles from "../../styles/Register.module.css";

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
      <div className={styles.pageContainer}>
        <div className={styles.loginContainer}>
          <ThemeProvider theme={editProfileTheme}>
            <div className={`${styles.cardContainer}`}>
              <div className={`${styles.card} ${styles.login}`}>
                <h4 className={styles.cardHeader}>Login</h4>
                <div className={styles.cardBody}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    id={styles.formContainer}
                  >
                    <div className={styles.formGroup}>
                      <TextField
                        label="Email"
                        name="email"
                        {...register("email")}
                        autoComplete="new-password"
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
                    <div className={styles.formGroup}>
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
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
                    <Button
                      variant="outlined"
                      type="submit"
                      disabled={formState.isSubmitting}
                      className={styles.loginButton}
                    >
                      {formState.isSubmitting ? <Spinner /> : "Login"}
                    </Button>
                  </form>
                </div>
              </div>
              <div className={styles.registerLink}>
                <p className="font-semibold">
                  Don't have an account?
                  <span>
                    <Link href="/account/register"> Click here </Link>
                  </span>
                  to register.
                </p>
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
