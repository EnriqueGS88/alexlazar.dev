import "../styles/globals.css";
import splitbee from "@splitbee/web";

function MyApp({ Component, pageProps }) {
  splitbee.init();

  return <Component {...pageProps} />;
}

export default MyApp;
