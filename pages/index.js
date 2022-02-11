import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CARD_BASE, CLOUDINARY_BASE } from "../components/constants";
import Name from "../components/name";
import Stats from "../components/stats";
import Sigils from "../components/sigils";

export default function Home() {
  // State management for this component
  const [url, setUrl] = useState(`${CLOUDINARY_BASE}${CARD_BASE}`);
  const [busy, setBusy] = useState(true);

  // Transformations to be applied to the image
  const [nameTF, setNameTF] = useState("");
  const [powerTF, setPowerTF] = useState("");
  const [healthTF, setHealthTF] = useState("");

  // Stagger requests so they only send 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusy(true);
      const transformations = [nameTF, powerTF, healthTF].join();
      setUrl(`${CLOUDINARY_BASE}${transformations}${CARD_BASE}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [nameTF, powerTF, healthTF]);

  return (
    <div>
      <Head>
        <title>Inscryber</title>
        <meta name="description" content="FIXME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <h1 className="mt-5 mb-10">Inscryber</h1>

        {/* Full grid layout */}
        <div className="md:grid md:grid-cols-2 md:gap-4 w-11/12 md:w-5/6 mx-auto">
          {/* Left column */}
          <div className="text-center md:text-left">
            {/* Name form field */}
            <Name setNameTF={setNameTF} />

            {/* Power & health form fields */}
            <Stats setPowerTF={setPowerTF} setHealthTF={setHealthTF} />

            {/* Cost form fields */}
            <section className="mb-10">
              <p className="mb-3">
                And every creature has a <label htmlFor="cost">cost</label>
                ...
              </p>

              <section className="grid grid-cols-2 gap-10 md:w-2/6 w-full">
                <input type="number" min="0" aria-label="Cost" name="cost" />

                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-orange-400 checked:border-white focus:outline-none transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer"
                      type="radio"
                      name="costRadio"
                      id="blood"
                      defaultChecked
                    />

                    <label className="text-white" htmlFor="blood">
                      Blood
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-orange-400 checked:border-white focus:outline-none transition duration-200 mt-1 align-top float-left mr-2 cursor-pointer"
                      type="radio"
                      name="costRadio"
                      id="bones"
                    />

                    <label className="text-white" htmlFor="bones">
                      Bones
                    </label>
                  </div>
                </div>
              </section>
            </section>

            {/* Sigils form field */}
            <Sigils />

            {/* Picture form field */}
            <section>
              <p className="mb-3">
                Finally... a <label htmlFor="portrait">portrait</label>.
              </p>

              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-100 bg-clip-padding border border-solid border-gray-300 rounded"
                type="file"
                id="portrait"
              />
            </section>
          </div>

          {/* Right column */}
          <div className="width-full flex justify-center items-center relative mt-16 md:mt-0 h-80 md:h-auto">
            {busy ? (
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-orange-400 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <></>
            )}

            <Image
              src={url}
              alt="A blank card with the 'Stinky' sigil"
              width={0}
              height={0}
              layout={busy ? 0 : "fill"}
              objectFit="contain"
              priority
              onLoadingComplete={() => {
                setBusy(false);
              }}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white">
        &copy; <a href="https://github.com/delete-44/">@delete44</a> [this
        website] | &copy; <a href="https://github.com/vladdeSV">@vladdeSV</a>{" "}
        [base card assets]
      </footer>
    </div>
  );
}
