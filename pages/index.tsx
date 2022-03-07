
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import xml2js from "xml2js";
import { rssUrl, siteDescription } from '../const';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from '../components/Head';
import { formatDate } from '../util';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

export async function getStaticProps() {
  const res = await fetch(rssUrl);
  const text = await res.text()
  let parser = new xml2js.Parser();

  let item = [];
  parser.parseString(text, (err: any, r: { rss: { channel: { item: any[]; }[]; }; }) => {
    if (err) {
      console.error(err);
      return
    }
    item = r.rss.channel[0].item;
  })
  return {
    props: {
      item
    }
  };
}

export default function Home(items: main.RSS["item"]) {
  return (
    <div className={styles.container}>
      <Head title="momit.fm" description={siteDescription}></Head>
      <Header></Header>
      <div className={styles.main}>
        {
          items["item"].map((item: { [x: string]: any; title: (boolean | ReactChild | ReactFragment | ReactPortal)[]; pubDate: string; }) => {
            let id = item["itunes:episode"]

            return (
              <article key={`ep-${id}`}>
                <h2 className={styles.main_title}>
                  <Link href={`/episode/${id}`}>{item.title[0]}</Link>
                </h2>
                <p className={styles.main_date}>{formatDate(item.pubDate)}</p>
                {/* <div className={styles.main_description} dangerouslySetInnerHTML={{ __html: item["description"][0] }}></div> */}
              </article>
            )
          })
        }
      </div>
      <Footer></Footer>
    </div>
  )
}
