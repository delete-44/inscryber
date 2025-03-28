import Document, { Html, Head, Main, NextScript } from "next/document";

// Base override from next documentation here:
// https://nextjs.org/docs/advanced-features/custom-document
// Additionally adds a custom lang
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
