// import { Alert } from "../components/Alert";
import { Alerts } from "../components";
import { wrapper, store, Persistor } from "../redux/store";
import { Provider } from "react-redux";
import * as d3 from "d3";
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
            <meta
              name="google-signin-client_id"
              content="304868782951-o0gqd2osf1fcjbhv9ibf63r6lru98p36.apps.googleusercontent.com"
            />
            <link rel="icon" href="/favicon.ico" />
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
          <Script src="https://apis.google.com/js/platform.js"/>
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
