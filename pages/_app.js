import '../style.css';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Magic State of the Art </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
