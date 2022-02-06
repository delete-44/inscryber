import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inscryber</title>
        <meta name="description" content="FIXME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-7xl text-orange-400 font-title text-shadow-orange text-center my-5">
          Inscryber
        </h1>

        {/* Full grid layout */}
        <div className="md:grid md:grid-cols-2 md:gap-4 w-5/6 mx-auto text-center">
          {/* Left column */}
          <div>
            {/* Name form field */}
            <section>
              <p className="text-5xl text-orange-400 font-title text-shadow-orange mt-5">
                Tell me this creature&apos;s{" "}
                <label htmlFor="" className="text-red text-shadow-red">
                  name
                </label>
                .
              </p>

              <input
                className="bg-orange-100 border-b-2 border-orange-400 w-full p-2 mt-2 text-4xl focus:outline-none focus:bg-white text-black"
                type="text"
                placeholder="Stoat"
                aria-label="Name"
                name="name"
              />
            </section>
          </div>

          {/* Right column */}
          <Image
            src="https://res.cloudinary.com/delete-44/image/upload/c_scale,l_v1644060029:Inscryption:rough_stinky_ijycvc.svg,w_248,y_340/v1644060066/Inscryption/blank_card_mvzub7.webp"
            alt="A blank card with the 'Stinky' sigil"
            width={640}
            height={1048}
          />
        </div>
      </main>

      <footer>&copy; delete44</footer>
    </div>
  );
}
