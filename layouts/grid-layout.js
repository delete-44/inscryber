import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Footer from "components/footer";

const GridLayout = ({ title, heading, children, cardBase = ""}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={`min-h-screen ${cardBase}`}>
        <h1 className="mt-5 mb-10">{heading}</h1>

        <div className="md:grid md:grid-cols-2 md:gap-4 md:w-5/6 w-11/12 mx-auto">
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
};

GridLayout.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  cardBase: PropTypes.string,
};

export default GridLayout;
