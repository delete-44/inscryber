import "styles/globals.scss";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

// Global entrypoint into Next app. Provides default SEO values
// for all pages as per the `next-seo.config.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
