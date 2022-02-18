import React from "react";
import Footer from "components/footer";

const GridLayout = (props) => {
  return (
    <>
      <main className="min-h-screen">
        <h1 className="mt-5 mb-10">{props.title}</h1>

        <div className="md:grid md:grid-cols-2 md:gap-4 w-11/12 md:w-5/6 mx-auto">
          {props.children}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GridLayout;
