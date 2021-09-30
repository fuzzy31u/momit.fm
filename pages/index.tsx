import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>momit.fm</title>
        <meta name="description" content="IT企業で働く2人のエンジニアが子育テックを中心にだらだらとおしゃべりするポッドキャストです." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/apple-touch-icon.png" sizes="180x180"></link>
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192"></link>
        <link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512"></link>
      </Head>

      <header className={styles.header}>
        <div className={styles.header_overlay}></div>
        <h1 className={styles.title}>
          momit.fm
        </h1>
        <p className={styles.description}>
        A podcast talking about Parenting and Tech.{' '}
        </p>
      </header>      

      <div className={styles.main}>
        <article>
          <h2>
            {/* <a href="./episode/1"> */}
              1. ここにタイトルを書きます &rarr;
            {/* </a> */}
          </h2>
          <p className={styles.main_date}>2021/10/XX</p>
          <audio controls preload="none" src="#"></audio>
        </article>
      </div>    

      <footer className={styles.footer}>
        <div className={styles.footer_inner}>
          <section className={styles.footer_section}>
            <h2>momit.fmとは</h2>
            <p>momit.fmは、IT企業で働く2人のエンジニアが子育テックを中心にだらだらとおしゃべりするポッドキャストです。</p>
          </section>
          <section className={styles.footer_section}>
            <h2>Feedback</h2>
            <p>momit.fmへの感想や質問などはTwitter <a href="https://twitter.com/search?q=%23momitfm">#momitfm</a> までお寄せください。</p>
          </section>
          <section className={styles.footer_section}>
            <h2>購読</h2>
            <p>新しいエピソードを下記より購読できます。</p>
            <ul>
              <li>Apple Podcasts</li>
            </ul>
          </section>
        </div>
        <span className={styles.footer_copyright}>
          Copyright © momit.fm
        </span>
      </footer>
    </div>
  )
}
