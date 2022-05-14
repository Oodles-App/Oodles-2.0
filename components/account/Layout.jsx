import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { createAlert } from "../../redux/alerts";
import { useDispatch } from "react-redux";

export { Layout };

function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.id !== undefined);

  useEffect(() => {
    console.log(router, "router object");
    console.log(router.pathname, "path name");
    // redirect to home if logged in user tries to access login/register
    if (
      (router.pathname.includes("login") ||
        router.pathname.includes("register")) &&
      isLoggedIn
    ) {
      router.push("/");
    }

    //redirect to home and send alert if non-logged in user tries to access edit-profile
    if (router.pathname === "/account/edit-profile") {
      if (!isLoggedIn) {
        dispatch(
          createAlert("error", "Unauthorized.", {
            id: "unauthorized-editProfile",
            autoClose: 3000,
            keepAfterRouteChange: true,
          })
        );
        router.push("/");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="col-md-6 offset-md-3 mt-5">{children}</div>;
}
