import { Alert } from "../components/Alert";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Alert />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
