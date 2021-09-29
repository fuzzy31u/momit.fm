import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>momit.fm</title>
        <meta name="description" content="A podcast talking about Parenting & tech." />
        <link rel="icon" href="/favicon.ico" />
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
          <p>2021/10/XX</p>
          <audio controls preload="none" src="#"></audio>
        </article>
      </div>    

      <footer className={styles.footer}>
        <div className={styles.footer_inner}>
          <section className={styles.footer_section}>
            <h2>momit.fmとは</h2>
            <p>momit.fmは、2人のママエンジニアが子育テックを中心に配信するポッドキャストです。</p>
          </section>
          <section className={styles.footer_section}>
            <h2>Feedback</h2>
            <p>momit.fmへの感想や質問などはTwitter #momitfm またはお問い合わせフォームまでお寄せください。</p>
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
