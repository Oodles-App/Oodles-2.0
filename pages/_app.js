import { Alert } from "../components/Alert";
import "../styles/globals.css";
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
      <Alert />
      <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
