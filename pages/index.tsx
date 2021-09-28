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

      <main className={styles.main}>
        <h1 className={styles.title}>
          momit.fm
        </h1>

        <p className={styles.description}>
        A podcast talking about Parenting and Tech.{' '}
        </p>

        <div className={styles.grid}>
          <article>
            <h2>
              <a href="./episode/1">
                1. ここにタイトルを書きます &rarr;
              </a>
            </h2>
            <p>ここにdescriptionを書きます</p>
          </article>
          <a href="./episode/1" className={styles.card}>
            <h2>2. ここにタイトルを書きます &rarr;</h2>
            <p>ここにdescriptionを書きます</p>
          </a>

          {/* <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
        </div>
      </main>

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
