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
        <h1 className="text-7xl text-orange font-title text-shadow-orange text-center my-5">
          Inscryber
        </h1>

        <div class="md:grid md:grid-cols-3 md:gap-4 w-100 md:w-4/5 mx-auto text-center">
          <section class="col-span-2">
            <h2 className="text-5xl text-orange font-title text-shadow-orange">
              Welcome, new Scrybe...
            </h2>
          </section>

          <section>
            <Image
              src="https://res.cloudinary.com/delete-44/image/upload/c_scale,l_v1644060029:Inscryption:rough_stinky_ijycvc.svg,w_248,y_340/v1644060066/Inscryption/blank_card_mvzub7.webp"
              alt="A blank card with the 'Stinky' sigil"
              width={640}
              height={1048}
            />
          </section>
        </div>
      </main>

      <footer>&copy; delete44</footer>
    </div>
  );
}
