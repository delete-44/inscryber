import React from "react";
import Link from "next/link";
import { LINKS } from "./constants";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 inline-flex w-full py-3 mt-12">
      <nav className="flex flex-col justify-between px-4 text-right border-r-2 border-orange-400">
        <section className="flex flex-col">
          <Link
            href="/"
            className="font-title text-shadow-orange text-4xl text-orange-400"
          >
            Inscryber
          </Link>

          <Link href="/about">About</Link>
        </section>

        <Link
          href="https://ko-fi.com/L4L64GJSW"
          target="_blank"
          rel="noreferer noopener"
          passHref
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
            height={36}
            width={174}
            style={{ border: "0px" }}
          />
        </Link>
      </nav>

      <ul className="inline px-4 text-orange-100">
        <li className="mb-2">
          &copy;{" "}
          <Link target="_blank" rel="noreferer noopener" href={LINKS.vladde}>
            vladdeSV
          </Link>
          <br />
          [&quot;normal&quot; card base asset]
        </li>

        <li className="mb-2">
          &copy;{" "}
          <Link target="_blank" rel="noreferer noopener" href={LINKS.avgUser}>
            anAverageUsersName
          </Link>
          <br />
          [additional cost assets, including the blood font type]
        </li>

        <li className="mb-2">
          &copy; Annieplyer
          <br />
          [act 1 themed energy assets]
        </li>

        <li className="mb-2">
          &copy;{" "}
          <Link target="_blank" rel="noreferer noopener" href={LINKS.dmizuomo}>
            DMizuomo
          </Link>
          <br />
          [original act 3 card template]
        </li>

        <li className="mb-2">
          &copy;{" "}
          <Link target="_blank" rel="noreferer noopener" href={LINKS.dmullins}>
            Daniel Mullins Games
          </Link>
          <br />
          [designs, IP. Used &amp; distributed with permission]
        </li>

        <li>
          &copy;{" "}
          <Link target="_blank" rel="noreferer noopener" href={LINKS.delete44}>
            delete44
          </Link>
          <br />
          [this website]
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
