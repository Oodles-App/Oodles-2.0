import { Alert } from "../components/Alert";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Oodles</title>
          <meta name="description" content="Donate Food to Nonprofit Organizations" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Alert />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default wrapper.withRedux(MyApp);
