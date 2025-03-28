import React from "react";
import GridLayout from "layouts/grid-layout";
import { LINKS } from "components/constants";
import Link from "next/link";

const About = () => {
  return (
    <GridLayout title="Inscryber | About" heading="About Inscryber">
      {/* Left column */}
      <div className="text-left">
        <h2>Overview</h2>

        <p className="about-text">
          Inscryber is a fan-made project celebrating Daniel Mullins&apos;{" "}
          <Link href={LINKS.inscryption}>Inscryption</Link>. This game captivated me
          from day one, and after seeing other fans make their own custom cards
          I decided this would be a fun project to make the process easier.
        </p>

        <p className="about-text">
          After many long days and sleepless nights, here we are.
        </p>

        <p className="about-text">
          It is far from a perfect piece of kit. If you find bugs with it, let
          me know. If there are more bugs than I am prepared for, I&apos;ll make
          a formal process for reporting them.
        </p>

        <h2>Privacy</h2>

        <p className="about-text">
          No cookies are used in this site \o/ Fuck that.
        </p>

        <p className="about-text">
          When you upload an image to this site, it is stored on Cloudinary with
          a <strong>publicly available link</strong>. Any images you upload{" "}
          <strong>will be visible</strong> to people if they have the link, and
          to those with access to the Cloudinary folder. To mitigate this,
          images are deleted 6 hours after upload.
        </p>
      </div>

      {/* Left column */}
      <div className="text-left">
        <h2>Get Involved</h2>

        <p className="about-text">
          This tool is completely open source and transparent. If you want to
          inspect the code, do so on <Link href={LINKS.inscryber_github}>GitHub</Link>
          . Or, if you want to see how badly managed it is, find it on{" "}
          <Link href={LINKS.inscryber_trello}>Trello</Link>.
        </p>

        <h2>Ownership</h2>

        <ul>
          <li className="about-text mb-4">
            Card base created by <Link href={LINKS.vladde}>@vladdeSV</Link>.
          </li>

          <li className="about-text mb-4">
            Blood font type, additional cost numbers, blank cost background
            created by <Link href={LINKS.avgUser}>@anAverageUsersName</Link>.
          </li>

          <li className="about-text mb-4">
            Act 1 themed energy costs created by @Annieplyer.
          </li>

          <li className="about-text mb-4">
            Act 3 card template adapted from the design created by{" "}
            <Link href={LINKS.dmizuomo}>@DMizuomo</Link>.
          </li>

          <li className="about-text mb-4">
            &quot;HEAVYWEIGHT&quot; font created by Nerfect Type Laboratories.
          </li>

          <li className="about-text mb-4">
            Additional card assets found in the Inscryption discord by
            @Cyantist.
          </li>

          <li className="about-text mb-4">
            This website created by <Link href={LINKS.delete44}>@delete44</Link>
          </li>

          <li className="about-text">
            And, of course, Inscryption created by{" "}
            <Link href={LINKS.dmullins}>Daniel Mullins</Link>
          </li>
        </ul>
      </div>
    </GridLayout>
  );
};

export default About;
