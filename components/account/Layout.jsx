import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createAlert } from "../../redux/alerts";
import { useDispatch } from "react-redux";

export { Layout };

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.id !== undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // redirect to home if logged in user tries to access login/register
    if (["/account/register", "/account/login"].includes(router.pathname)) {
      if (isLoggedIn) {
        dispatch(
          createAlert({
            key: new Date().getTime(),
            autoClose: 3000,
            message: "You are already logged in.",
            keepAfterRouteChange: true,
          })
        );
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      } else if (!isLoggedIn) {
        setLoading(false);
      }
    }
    if (router.pathname === "/account/edit-profile") {
      if (!isLoggedIn) {
        dispatch(
          createAlert({
            key: new Date().getTime(),
            autoClose: 3000,
            message: "Please log in to view this page.",
            keepAfterRouteChange: true,
          })
        );
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      } else if (isLoggedIn) {
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isLoading ? <div></div> : <div>{children}</div>}</>;
}
