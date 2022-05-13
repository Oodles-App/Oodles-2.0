import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export { Layout };

function Layout({ children }) {
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.user.id !== undefined);

  useEffect(() => {
    // redirect to home if already logged in
    console.log("isLoggedIn: ", isLoggedIn);
    if (isLoggedIn) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="col-md-6 offset-md-3 mt-5">{children}</div>;
}
