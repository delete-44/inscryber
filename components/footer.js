import React from "react";
import Link from "next/link";

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

      <ul className="px-4 text-orange-100">
        <li>
          &copy; <a href="https://github.com/vladdeSV">vladdeSV</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[card base
          assets]
        </li>

        <li>
          &copy;{" "}
          <a href="https://www.danielmullinsgames.com/">Daniel Mullins</a>&nbsp;
          [designs, IP, original game, etc. Used &amp; distributed with
          permission]
        </li>

        <li>
          &copy; <a href="https://github.com/delete-44/">delete44</a>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[this
          website]
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
