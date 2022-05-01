import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Footer from "components/footer";

const GridLayout = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <main className={`min-h-screen ${props.cardBase}`}>
        <h1 className="mt-5 mb-10">{props.heading}</h1>

        <div className="md:grid md:grid-cols-2 md:gap-4 w-11/12 md:w-5/6 mx-auto">
          {props.children}
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

GridLayout.defaultProps = {
  cardBase: "",
};

export default GridLayout;
