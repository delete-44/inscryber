import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-100 w-full inline-flex mt-12">
      <ul className="my-3 px-4 border-r-2 border-orange-400">
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

      <a href="/about">About</a>
    </footer>
  );
};

export default Footer;
