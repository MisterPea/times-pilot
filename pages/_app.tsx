import { AppProps } from "next/app";
import "../src/style/global.scss"
import Head from "next/head";

export default function MainApp({ Component, pageProps }:AppProps) {
  return (
    <>
      <Head>
        <title>the.times.pilot</title>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}