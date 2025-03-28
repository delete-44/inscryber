import Head from "next/head";

// Overrides default 404 page to provide light/dark-theme appropriate styling
export default function Custom404() {
  return (
    <>
      <Head>
        <title>404: Page not found</title>
      </Head>

      <main className="flex items-center justify-center min-h-screen">
        <h1 className="border-r border-orange-400 pr-4 text-red text-shadow-red">404</h1>
        <p className="pl-4">Page not found</p>
      </main>
    </>
  );
}
