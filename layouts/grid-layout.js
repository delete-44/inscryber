import React from "react";
import Head from "next/head";
import Footer from "components/footer";

const GridLayout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <main
        className={`min-h-screen ${
          props.cardBase && props.cardBase.match(/po3/) ? "po3" : ""
        }`}
      >
        <h1 className="mt-5 mb-10">{props.heading}</h1>

        <div className="md:grid md:grid-cols-2 md:gap-4 w-11/12 md:w-5/6 mx-auto">
          {props.children}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GridLayout;
