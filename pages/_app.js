import { Alert } from "../components/Alert";
import "../styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Oodles</title>
        <meta name="description" content="Donate Food to Nonprofit Organizations" />
        <link rel="icon" href="utensilHeart.png" />
      </Head>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
