// import { Alert } from "../components/Alert";
import { Alerts } from "../components";
import { wrapper, store, Persistor } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import ErrorBoundary from "../components/ErrorBoundary";
import Script from "next/script";

import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <Head>
            <title>Oodles</title>
            <meta
              name="description"
              content="Donate Food to Nonprofit Organizations"
            />
            <link rel="icon" href="/utensilHeart.png" />
          </Head>
          <Layout>
            <Alerts />
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
          </Layout>
          <Script
            src="https://cdn.jsdelivr.net/npm/d3@4.13.0/build/d3.min.js"
            charset="utf-8"
            defer
            crossOrigin=""
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/taucharts@2/dist/taucharts.min.js"
            type="text/javascript"
            defer
            // onLoad={() => {
            //   setTaucharts({ taucharts: window.Taucharts("pk_test_12345") });
            // }}
            crossOrigin=""
          />
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
