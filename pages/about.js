import React from "react";

const About = () => {
  return (
    <main className="w-5/6 mx-auto">
      <h1 className="mt-5">About Inscryber</h1>

      <p className="mb-8 text-white text-2xl font-sans">
        Inscryber is a fan-made project celebrating Daniel Mullins'{" "}
        <a
          className="text-red text-shadow-red"
          href="https://www.inscryption.com/"
        >
          Inscryption
        </a>
        . This game captivated me from day one, and after seeing other fans make
        their own custom cards I decided this would be a fun project to make the
        process easier.
      </p>

      <p className="mb-8 text-white text-2xl font-sans">
        However many long days and sleepless nights later, here we are.
      </p>

      <p className="mb-8 text-white text-2xl font-sans">
        It is far from a perfect piece of kit. If you find bugs with it, let me
        know via{" "}
        <a
          className="text-red text-shadow-red"
          href="https://twitter.com/_delete44"
        >
          Twitter
        </a>
        . If there are more bugs than I am prepared for, I'll make a formal
        process for reporting them.
      </p>

      <h2 className="font-title text-orange-400 text-shadow-orange text-4xl">
        Get Involved
      </h2>

      <p className="mb-8 text-white text-2xl font-sans">
        This tool is completely open source and transparent. If you want to
        inspect the code, do so on{" "}
        <a
          className="text-red text-shadow-red"
          href="https://github.com/delete-44/inscryber"
        >
          GitHub
        </a>
        . Or, if you want to see how badly managed it is, find it on{" "}
        <a
          className="text-red text-shadow-red"
          href="https://trello.com/b/dBsycGJJ/inscryber"
        >
          Trello
        </a>
        .
      </p>

      <h2 className="font-title text-orange-400 text-shadow-orange text-4xl">
        Ownership
      </h2>

      <p className="text-white text-2xl font-sans">
        Card base created by{" "}
        <a className="text-red text-shadow-red" href="https://cards.vladde.me/">
          @vladdeSV
        </a>
        .
      </p>
      <p className="text-white text-2xl font-sans">
        "HEAVYWEIGHT" font created by Nerfect Type Laboratories .
      </p>
      <p className="text-white text-2xl font-sans">
        Additional card assets found in the inscribe-datamine discord by
        @Cyantist.
      </p>
      <p className="text-white text-2xl font-sans">
        This website created by{" "}
        <a
          className="text-red text-shadow-red"
          href="https://www.delete44.com/"
        >
          @delete44
        </a>
      </p>
      <p className="text-white text-2xl font-sans">
        And finally, Inscryption created by{" "}
        <a
          className="text-red text-shadow-red"
          href="https://www.danielmullinsgames.com/"
        >
          Daniel Mullins
        </a>
      </p>
    </main>
  );
};

export default About;
