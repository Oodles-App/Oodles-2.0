import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    //SessionProvider makes sure auth works in our app
    <SessionProvider>
      <Head>
        <title>Oodles</title>
        <meta name="description" content="Donate Food to Nonprofit Organizations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
