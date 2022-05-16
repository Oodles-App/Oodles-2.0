import { Alert } from "../components/Alert";
import { wrapper, store, Persistor } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Layout from "../components/Layout"
import Head from "next/head";

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
            <Alert />
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
