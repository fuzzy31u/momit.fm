
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import xml2js from "xml2js";
import { rssUrl } from '../const';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from '../components/Head';

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
      <Head></Head>
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
