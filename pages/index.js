import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inscryber</title>
        <meta name="description" content="FIXME" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-7xl text-orange font-title text-shadow-orange">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>

      <footer>&copy; delete44</footer>
    </div>
  );
}
