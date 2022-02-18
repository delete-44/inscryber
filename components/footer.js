import React from "react";
import Link from "next/link";
import { LINKS } from "./constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 w-full inline-flex mt-12 py-3">
      <nav className="px-4 border-r-2 border-orange-400 flex flex-col text-right">
        <Link href="/">
          <a className="font-title text-orange-400 text-shadow-orange text-4xl">
            Inscryber
          </a>
        </Link>

        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>

      <ul className="px-4 text-orange-100 inline">
        <li>
          &copy; <a href={LINKS.vladde}>vladdeSV</a>
          <br />
          [card base assets]
        </li>

        <li>
          &copy; <a href={LINKS.dmullins}>Daniel Mullins</a>
          <br />
          [designs, IP. Used &amp; distributed with permission]
        </li>

        <li>
          &copy; <a href={LINKS.delete44}>delete44</a>
          <br />
          [this website]
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
