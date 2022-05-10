import {SessionProvider} from "next-auth/react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    //SessionProvider makes sure auth works in our app
    <SessionProvider>
  <Component {...pageProps} />
  </SessionProvider>
  );
}

export default MyApp
