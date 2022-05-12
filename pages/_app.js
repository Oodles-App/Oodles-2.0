import { Alert } from "../components/Alert";
import "../styles/globals.css";
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Oodles</title>
        <meta name="description" content="Donate Food to Nonprofit Organizations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Alert />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
