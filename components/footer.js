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
        <li className="mb-2">
          &copy; <a href={LINKS.vladde}>vladdeSV</a>
          <br />
          [&quot;normal&quot; card base asset]
        </li>

        <li className="mb-2">
          &copy; <a href={LINKS.avgUser}>anAverageUsersName</a>
          <br />
          [additional cost assets, including the blood font type]
        </li>

        <li className="mb-2">
          &copy; Annieplyer
          <br />
          [act 1 themed energy assets]
        </li>

        <li className="mb-2">
          &copy; <a href={LINKS.dmizuomo}>DMizuomo</a>
          <br />
          [original act 3 card template]
        </li>

        <li className="mb-2">
          &copy; <a href={LINKS.dmullins}>Daniel Mullins Games</a>
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
