import { Alert } from "../components/Alert";
import { wrapper, store, Persistor } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Layout from "../components/Layout"
import Head from "next/head";

<<<<<<< HEAD
import Script from "next/script";



import Layout from "../components/Layout";

=======
>>>>>>> main
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
            <meta name="google-signin-client_id" content="304868782951-o0gqd2osf1fcjbhv9ibf63r6lru98p36.apps.googleusercontent.com"/>
            <link rel="icon" href="/favicon.ico" />
          </Head>
<<<<<<< HEAD
          <Alert />
          <Script src="https://apis.google.com/js/platform.js"/>
          <Component {...pageProps} />
=======
          <Layout>
            <Alert />
            <Component {...pageProps} />
          </Layout>
>>>>>>> main
        </PersistGate>
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
