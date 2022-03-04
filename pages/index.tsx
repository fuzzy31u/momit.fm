import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import xml2js from "xml2js";
import { rssUrl, siteDescription } from '../const';
import Header from '../components/Header';
import Footer from '../components/Footer';

function initGA() {  
  return {__html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-PXK0BSCDXQ');
      gtag('config', 'UA-219601984-1');  
  `}
}

export async function getStaticProps() {
  const res = await fetch(rssUrl);
  const text = await res.text()
  let parser = new xml2js.Parser();

  let item = [];
  parser.parseString(text, (err, r) => {
    item = r.rss.channel[0].item;
  })
  return {
    props: {
      item
    }
  };
}

export default function Home(item) {
  return (
    <div className={styles.container}>
      <Head>
        <title>momit.fm</title>
        <meta name="description" content={siteDescription} />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/apple-touch-icon.png" sizes="180x180"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"></link>
        <link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512"></link>
        <meta name="og:image" content="./sq-momitfm-gray.png"></meta>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PXK0BSCDXQ"></script>
        <script dangerouslySetInnerHTML={initGA()} />
      </Head>
      <Header></Header>
      <div className={styles.main}>
          {
            item["item"].map(e => {
              let id = e["itunes:episode"]
              // const fmtDate = new Date(e.pubDate).toISOString().split('T')[0]
              const d = new Date(e.pubDate)
              const month = '' + (d.getMonth() + 1),
                  day = '' + d.getDate(),
                  year = d.getFullYear();
              const fmtDate = [year, month, day].join("/");
          
              return (
                <article key={`ep-${id}`}>
                  <h2>
                    <Link href={`/episode/${id}`}>{e.title[0]}</Link>
                  </h2>
                  <p className={styles.main_date}>{fmtDate}</p>
                  {/* <div className={styles.main_description} dangerouslySetInnerHTML={{__html: e.description}}></div>                               */}
                </article>
              )
            })
          }
      </div>
      <Footer></Footer>
    </div>
  )
}
