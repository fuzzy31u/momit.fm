import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPodcast, faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faSpotify, faApple } from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/Home.module.css'

const description = "IT企業で働く2人のエンジニアが子育テックを中心におしゃべりするポッドキャストです."

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>momit.fm</title>
        <meta name="description" content={description} />
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
          {description}
        </p>
      </header>      

      <div className={styles.main}>
      <article>
          <h2>
            3. Vercel / 育休中のインプット / Feed / 推薦アルゴリズムの多様性
          </h2>
          <p className={styles.main_date}>2021/11/09</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-10-9/229785253-44100-2-c7656c4c754dc.m4a"></audio>
          <p className={styles.main_description}>
            <a href="https://www.pj-iforget.com/">松井さんの短編映画</a>、<a href="https://event.shoeisha.jp/devsumi/20211117">Women Developers Summit</a>、<a href="https://2021.bit-valley.jp/program/career/35">BIT VALLEY 2021#06</a>、副業タイプ、<a href="https://waffle-fes2021.peatix.com/">Waffle Festival</a>、<a href="https://gihyo.jp/magazine/wdpress">WEB+DB press</a>、<a href="https://gihyo.jp/dev/serial/01/cyberagent/0017">サイバーエージェントを支える技術的たちvol.17</a>、
            <a href="https://nextjs.org/">Next.js</a>、<a href="https://vercel.com/">Vercel</a>、<a href="https://www.netlify.com/">Netlify</a>、
            育休中のインプット、Podcast（<a href="https://rebuild.fm/">Rebuild.fm</a>、<a href="https://www.yancan.tech/">yancan.fm</a>、<a href="https://softwareengineeringdaily.com/category/all-episodes/exclusive-content/Podcast/">Software Engineering Daily</a>、Slack reminder、<a href="https://feedly.com/">Feedly</a>、Livedoor Feed、
            Twitter Timelineの最適化問題、推薦アルゴリズム、機械学習の多様性、技術と倫理問題
          </p>
        </article>
        <article>
          <h2>
            2. スマートホーム、オンライン授業
          </h2>
          <p className={styles.main_date}>2021/10/18</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-9-18/225120195-44100-2-584b8a81d3e61.m4a"></audio>
          <p className={styles.main_description}>
          スマートホーム（<a href="https://qrio.me/smartlock/">ロック</a>、<a href="https://www.tp-link.com/jp/home-networking/smart-bulb/">ライト</a>、<a href="https://www.meross.com/home">プラグ</a>、<a href="https://nature.global/">リモコン</a>） / オンライン授業
          </p>
        </article>
        <article>
          <h2>
            {/* <a href="./episode/1"> */}
            1. キャリア、育休、フェムテック、マイクラ
            {/* </a> */}
          </h2>
          <p className={styles.main_date}>2021/10/05</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-9-8/223159612-44100-2-ab19a7fe449dc.m4a"></audio>
          <p className={styles.main_description}>
          ソフトウェアエンジニア、インフラエンジニアとしてのキャリア / 育休、ママエンジニア / フェムテック、妊娠中のQOL、女性ホルモン、PMS / マイクラ、<a href="https://www.minecraft.net/ja-jp/realms/bedrock">Realms Plus</a> 、<a href="https://techkidsschool.jp/camp/real/">CA Tech Kidsマイクラキャンプ</a> 、<a href="https://www.minecraft.net/en-us/store/minecraft-java-edition">Java Edition</a> / 女性向けプログラミングブートキャンプ<a href="https://ms-engineer.jp/">Ms.Engineer</a> 1期生を募集中
          </p>
        </article>
      </div>    

      <footer className={styles.footer}>
        <div className={styles.footer_inner}>
          <section className={styles.footer_section}>
            <h2>momit.fmとは</h2>
            <p>momit.fmは、{description}</p>
          </section>
          <section className={styles.footer_section}>
            <h2>Feedback</h2>
            <p>momit.fmへの感想や質問などはTwitter <a href="https://twitter.com/search?q=%23momitfm">#momitfm</a> までお寄せください.</p>
          </section>
          <section className={styles.footer_section}>
            <h2>購読</h2>
            <p>新しいエピソードを下記より購読できます.</p>
            <ul>
            <li><FontAwesomeIcon icon={faApple} className={styles.footer_subscribe_icon} /> <a href="https://podcasts.apple.com/us/podcast/momit-fm/id1589345170">Apple Podcasts</a></li>
            <li><FontAwesomeIcon icon={faGoogle} className={styles.footer_subscribe_icon} /> <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy82ZDAyZjI4NC9wb2RjYXN0L3Jzcw">Google Podcasts</a></li>
            <li><FontAwesomeIcon icon={faPodcast} className={styles.footer_subscribe_icon} /> <a href="https://anchor.fm/momitfm/episodes/1-e18cb2k">Anchor</a></li>
            <li><FontAwesomeIcon icon={faSpotify} className={styles.footer_subscribe_icon} /> <a href="https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX">Spotify</a></li>
            <li><FontAwesomeIcon icon={faRssSquare} className={styles.footer_subscribe_icon} /> <a href="https://anchor.fm/s/6d02f284/podcast/rss">RSS</a></li>
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
