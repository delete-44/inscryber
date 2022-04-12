import React from "react";
import GridLayout from "layouts/grid-layout";
import { LINKS } from "components/constants";

const About = () => {
  return (
    <GridLayout title="Inscryber | About" heading="About Inscryber">
      {/* Left column */}
      <div className="text-left">
        <h2>Overview</h2>

        <p className="about-text">
          Inscryber is a fan-made project celebrating Daniel Mullins&apos;{" "}
          <a href={LINKS.inscryption}>Inscryption</a>. This game captivated me
          from day one, and after seeing other fans make their own custom cards
          I decided this would be a fun project to make the process easier.
        </p>

        <p className="about-text">
          After many long days and sleepless nights, here we are.
        </p>

        <p className="about-text">
          It is far from a perfect piece of kit. If you find bugs with it, let
          me know via <a href={LINKS.delete44_twitter}>Twitter</a>. If there are
          more bugs than I am prepared for, I&apos;ll make a formal process for
          reporting them.
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
          inspect the code, do so on <a href={LINKS.inscryber_github}>GitHub</a>
          . Or, if you want to see how badly managed it is, find it on{" "}
          <a href={LINKS.inscryber_trello}>Trello</a>.
        </p>

        <h2>Ownership</h2>

        <ul>
          <li className="about-text mb-4">
            Card base created by <a href={LINKS.vladde}>@vladdeSV</a>.
          </li>

          <li className="about-text mb-4">
            Blood font type, additional cost numbers, blank cost background
            created by <a href={LINKS.avgUser}>@anAverageUsersName</a>.
          </li>

          <li className="about-text mb-4">
            Act 1 themed energy costs created by @Annieplyer.
          </li>

          <li className="about-text mb-4">
            &quot;HEAVYWEIGHT&quot; font created by Nerfect Type Laboratories.
          </li>

          <li className="about-text mb-4">
            Additional card assets found in the Inscryption discord by
            @Cyantist.
          </li>

          <li className="about-text mb-4">
            This website created by <a href={LINKS.delete44}>@delete44</a>
          </li>

          <li className="about-text">
            And, of course, Inscryption created by{" "}
            <a href={LINKS.dmullins}>Daniel Mullins</a>
          </li>
        </ul>
      </div>
    </GridLayout>
  );
};

export default About;
