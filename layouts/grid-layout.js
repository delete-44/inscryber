import React from "react";
import Footer from "components/footer";
import Head from "next/head";

const GridLayout = (props) => {
  return (
    <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content="FIXME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <h1 className="mt-5 mb-10">{props.title}</h1>

        <div className="layout-grid">{props.children}</div>
      </main>

      <Footer />
    </div>
  );
};

export default GridLayout;
