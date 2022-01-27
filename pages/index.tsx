import Head from 'next/head'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPodcast, faRssSquare } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faSpotify, faApple, faAmazon } from '@fortawesome/free-brands-svg-icons'
import styles from '../styles/Home.module.css'

const description = "IT企業で働くママエンジニアとママPMが、子育てやテックについてお話しするPodcastです."

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>momit.fm</title>
        <meta name="description" content={description} />
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
            8. デザインリニューアル / インポスターシンドローム
          </h2>
          <p className={styles.main_date}>2022/01/26</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2022-0-26/244415080-44100-2-7e26fb5a1e4e2.m4a"></audio>
          <p className={styles.main_description}>
          momit.fmのメインビジュアルを<a href="https://twitter.com/yukahiiragi">柊有花さん</a>にデザインしていただいた話、<a href="https://prtimes.jp/main/html/rd/p/000000328.000020853.html">モロゾフのショコラギャラリー</a>、<a href="https://www.1101.com/store/techo/">ほぼ日手帳</a>、Anchorの機能を試してる話（poll, trailer）、<a href="https://music.amazon.co.jp/podcasts/b355900d-b05b-4366-83ae-d7bf3a22d84a/momit-fm">Amazon podcast</a>にも配信開始しました、子ども向け動画配信サービスのサブスク地獄になる話、子どもがごっこ遊びする時にスマートスピーカーでBGMかけてる話、末っ子の保育園が決まりましたyay、<a href="https://www.city.setagaya.lg.jp/mokuji/kodomo/002/003/d00161213.html">ワークスペース付きおでかけ広場</a>、内閣府男女共同参画局の<a href="https://twitter.com/danjokyoku/status/1483348438670577665?s=20">「仕事と子育て等の両立を阻害する慣行等」に関する事例の収集・分析</a>、<a href="https://branchkids.jp/">Branch</a>-苦手なことを克服して社会に溶け込むより、好きなことで自信を創って社会とつながろう-、育休中の落とし穴（育児休業給付金に上限がある話、育児休業給付金が時短復帰だとさらに下がる話）、インポスターシンドロームを克服しようとしてる話、<a href="https://www.amazon.co.jp/LEAN-%E3%83%AA%E3%83%BC%E3%83%B3%E3%83%BB%E3%82%A4%E3%83%B3-%E5%A5%B3%E6%80%A7%E3%80%81%E4%BB%95%E4%BA%8B%E3%80%81%E3%83%AA%E3%83%BC%E3%83%80%E3%83%BC%E3%81%B8%E3%81%AE%E6%84%8F%E6%AC%B2-%E3%82%B7%E3%82%A7%E3%83%AA%E3%83%AB%E3%83%BB%E3%82%B5%E3%83%B3%E3%83%89%E3%83%90%E3%83%BC%E3%82%B0/dp/4532318971">LEAN IN</a>、<a href="https://www.womentechmakers.com/">Women Techmakers</a>、<a href="https://twitter.com/_yukamiya/status/1462007370754658312?s=20">仮にエンジニアの半数が女性だったら</a>、ジェンダーギャップ解消活動をしているワケ
          </p>
        </article>
        <article>
          <h2>
            7. 教育現場のDX / 年末年始ISP・スマホプラン最適化 / GraphQL
          </h2>
          <p className={styles.main_date}>2022/01/11</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2022-0-11/241794171-44100-2-530bf1ae75207.m4a"></audio>
          <p className={styles.main_description}>
          Courseraのリモートチームマネジメント講義<a href="https://www.coursera.org/learn/remote-team-management">「How to Manage a Remote Team」</a>、母親の時短復帰問題、小1の壁の変化、親の働き方の変化と子どもの心理、保育・教育機関のDX化（民間保育園の献立アプリ化、公立小学校の<a href="https://qubena.com/">AI型教材アプリ</a>）、アダプティブラーニング、地域格差と教育格差、実家のスマホオプション棚卸し、実家の年賀状ソフト毎年デバッグさせられる件、家のISP変更、最適化（Softbank、楽天、Nuro etc.）、IPv6対応ルーター（TP-Link）、スマートライト<a href="https://www.philips-hue.com/ja-jp">Philips Hue</a>、<a href="https://github.com/stackrole/gatsby-starter-foundation">gatsby-starter-foundation</a>、<a href="https://graphql.org/">GraphQL</a>、<a href="https://gihyo.jp/magazine/wdpress/archive/2021/vol125">WEB+DB press vol.125</a>、Web APIの変遷（<a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</a>と<a href="https://en.wikipedia.org/wiki/SOAP">SOAP</a>、<a href="https://restfulapi.net/http-methods/">REST APIs HTTP Method</a>）、インフラオーケストレーションツール（<a href="https://www.chef.io/products/chef-infra">Chef</a>、<a href="https://www.terraform.io/">Terraform</a>、<a href="https://gihyo.jp/magazine/wdpress/archive/2021/vol122">WEB+DB press vol.122</a>
          </p>
        </article>
        <article>
          <h2>
            6. 行動ログ集計サイトの裏側 / プログラミング教育 / 子どもの写真問題
          </h2>
          <p className={styles.main_date}>2021/12/22</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-11-23/239146578-44100-2-a4b4add7b4f55.m4a"></audio>
          <p className={styles.main_description}>
          アイスブレイク（社内イベントのレポーター、男性リスナー、フィードバック、行動力）、<a href="https://podcasters.spotify.com/">Spotify・Anchor視聴傾向まとめサイト</a>、行動ログ集計サイトの裏側、システムアーキテクチャ（<a href="https://cloud.google.com/bigquery">BigQuery</a>、<a href="https://cloud.google.com/pubsub">Cloud Pub/Sub</a>）、<a href="https://ms-engineer01.peatix.com/?lang=ja">MsEngineerサミット#1</a>澤さんの話、自動販売機のフローチャート、アルゴリズムの講義、子ども向けビジュアルプログラミング、<a href="https://scratch.mit.edu/">Scratch</a>、プログラミング的思考法、Eテレ「<a href="https://www.nhk.jp/p/pitagora/ts/WLQ76PGNW2/">ピタゴラスイッチ</a>」「<a href="https://www.nhk.or.jp/school/sougou/texico/">テキシコー</a>」、プログラミング教育、コロナ禍の運動会で1人複数デバイス撮影する話、Osmo Camera、子どもの写真どうしてる問題、保育園のスナップ写真
          </p>
        </article>
        <article>
          <h2>
            5. 無意識バイアス / ジェンダーロール / 多様性と教育
          </h2>
          <p className={styles.main_date}>2021/12/10</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-11-10/236699039-44100-2-bf458e421bd0a.m4a"></audio>
          <p className={styles.main_description}>
          無意識バイアス、ジェンダーロール（教育コンテンツの変化、しまじろうの家庭観）、セサミストリート<a href="https://www.sesamestreetjapan.org/Diversity-Inclusion/index.html">自閉症のキャラクター「ジュリア」</a>、Eテレ<a href="https://www.nhk.or.jp/school/tokushi/ui/">多様性への理解を深める番組「u&i」</a>、<a href="https://www.cyberagent.co.jp/way/features/list/detail/id=26859">ダイバーシティ推進プロジェクト「CAlorful」が誕生</a>、男性育休、<a href="https://www.amazon.co.jp/Google%E6%B5%81-%E3%83%80%E3%82%A4%E3%83%90%E3%83%BC%E3%82%B7%E3%83%86%E3%82%A3-%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3-%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%B7%E3%83%96%E3%81%AA%E8%A3%BD%E5%93%81%E9%96%8B%E7%99%BA%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E6%96%B9%E6%B3%95%E3%81%A8%E5%AE%9F%E8%B7%B5-%E3%82%A2%E3%83%8B%E3%83%BC%E3%83%BB%E3%82%B8%E3%83%A3%E3%83%B3/dp/4802512163">Google流 ダイバーシティ&インクルージョン インクルーシブな製品開発のための方法と実践</a>、プロダクトインクルージョン、<a href="https://www.amazon.co.jp/%E3%83%80%E3%82%A4%E3%83%90%E3%83%BC%E3%82%B7%E3%83%86%E3%82%A3-%E3%82%A4%E3%83%B3%E3%82%AF%E3%83%AB%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3%E7%B5%8C%E5%96%B6-%E3%81%93%E3%82%8C%E3%81%8B%E3%82%89%E3%81%AE%E7%B5%8C%E5%96%B6%E6%88%A6%E7%95%A5%E3%81%A8%E5%83%8D%E3%81%8D%E6%96%B9-%E8%8D%92%E9%87%91-%E9%9B%85%E5%AD%90/dp/4542701816">ダイバーシティ&インクルージョン経営: これからの経営戦略と働き方</a>、<a href="https://www.amazon.co.jp/%E5%A4%9A%E6%A7%98%E6%80%A7%E3%81%AE%E7%A7%91%E5%AD%A6-%E7%94%BB%E4%B8%80%E7%9A%84%E3%81%A7%E5%87%8B%E8%90%BD%E3%81%99%E3%82%8B%E7%B5%84%E7%B9%94%E3%80%81%E8%A4%87%E6%95%B0%E3%81%AE%E8%A6%96%E7%82%B9%E3%81%A7%E5%95%8F%E9%A1%8C%E3%82%92%E8%A7%A3%E6%B1%BA%E3%81%99%E3%82%8B%E7%B5%84%E7%B9%94-%E3%83%9E%E3%82%B7%E3%83%A5%E3%83%BC%E3%83%BB%E3%82%B5%E3%82%A4%E3%83%89/dp/4799327526/ref=pd_vtp_4/358-6753931-2583208?pd_rd_w=o0MMa&pf_rd_p=949e26f5-c2ef-4c96-bfde-49d7614d0317&pf_rd_r=7XPEERY0SZPBAE5HQVYQ&pd_rd_r=10415f68-08c8-49e4-9c90-5bc4ac074687&pd_rd_wg=OtPce&pd_rd_i=4799327526&psc=1">多様性の科学 画一的で凋落する組織、複数の視点で問題を解決する組織</a>、多様性に関する子どもへの声掛け・教育、<a href="https://www.washingtonpost.com/nation/2021/10/11/california-law-gender-neutral-children-toy-section/">カリフォルニア州でジェンダーニュートラルなおもちゃ売り場設置を義務付ける法律</a>
          </p>
        </article>
        <article>
          <h2>
            4. プロマネ / 障害対応の歴史 / IT業界のジェンダーギャップ / 家事育児のマルチタスキング
          </h2>
          <p className={styles.main_date}>2021/11/24</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-10-25/233405983-44100-2-9f01ebeb91d79.m4a"></audio>
          <p className={styles.main_description}>
          プロマネ、PdMとPjM、障害対応の歴史、監視ツール（<a href="https://www.nagios.org/">Nagios</a>、<a href="http://mon.sourceforge.net/">mon</a>、<a href="https://www.datadoghq.com/">DataDog</a>）、<a href="https://event.shoeisha.jp/devsumi/20211117">デブサミウーマン</a>、<a href="https://twitter.com/hashtag/devsumi?src=hashtag_click">#devsumi</a>、女性向けITカンファレンス、IT業界のジェンダーギャップ、ジェンダーバイアス、ハードルを取り除く話（<a href="https://jp.techcrunch.com/2021/08/04/yamada-shintaro-di-foundation/">山田進太郎D&amp;I財団 女子学生奨学金プログラム</a>）、<a href="https://twitter.com/_a0i/status/1460908385486839813?s=20">インフラが苦手でも大丈夫！紙芝居Kubernetes</a>、<a href="https://twitter.com/_yukamiya/status/1461147123093671936">BIT VALLEY 2021#6『副業で広がるキャリアの可能性と働き方の選択肢』</a>、<a href="https://waffle-fes2021.peatix.com/">Waffle Festival</a>、育休中の社会とのつながり、生活の合理化、家事育児のマルチタスキング
          </p>
        </article>
        <article>
          <h2>
            3. Vercel / 育休中のインプット / Feed / 推薦アルゴリズムの多様性
          </h2>
          <p className={styles.main_date}>2021/11/09</p>
          <audio className={styles.main_audio} controls src="https://d3ctxlq1ktw2nl.cloudfront.net/staging/2021-10-9/229785253-44100-2-c7656c4c754dc.m4a"></audio>
          <p className={styles.main_description}>
            <a href="https://www.pj-iforget.com/">松井さんの短編映画</a>、<a href="https://event.shoeisha.jp/devsumi/20211117">Women Developers Summit</a>、<a href="https://2021.bit-valley.jp/program/career/35">BIT VALLEY 2021#06</a>、副業タイプ、<a href="https://waffle-fes2021.peatix.com/">Waffle Festival</a>、<a href="https://gihyo.jp/magazine/wdpress">WEB+DB press</a>、<a href="https://gihyo.jp/dev/serial/01/cyberagent/0017">サイバーエージェントを支える技術的たちvol.17</a>、
            <a href="https://nextjs.org/">Next.js</a>、<a href="https://vercel.com/">Vercel</a>、<a href="https://www.netlify.com/">Netlify</a>、
            育休中のインプット、Podcast（<a href="https://rebuild.fm/">Rebuild.fm</a>、<a href="https://www.yancan.tech/">yancan.fm</a>、<a href="https://softwareengineeringdaily.com/category/all-episodes/exclusive-content/Podcast/">Software Engineering Daily</a>）、<a href="https://news.ycombinator.com/news">Hacker News</a>、<a href="https://docs.github.com/en/rest/reference/activity#feeds">GitHub feed</a>、Slack reminder、<a href="https://feedly.com/">Feedly</a>、Livedoor Feed、
            Twitter Timelineの最適化問題、推薦アルゴリズム、機械学習の多様性、技術と倫理問題
          </p>
        </article>
        <article>
          <h2>
            2. スマートホーム / オンライン授業
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
            1. キャリア / 育休 / フェムテック / マイクラ
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
            <p>momit.fmへの感想や質問などはTwitter <a href="https://twitter.com/search?q=%23momitfm">#momitfm</a> または<a href='https://docs.google.com/forms/d/e/1FAIpQLSfwtvdBRjwhWyI4wvpX42knaLbQ3Ac05XVwd0mr4GFvYmT1wg/viewform'>アンケートフォーム</a>までお寄せください.</p>
          </section>
          <section className={styles.footer_section}>
            <h2>購読</h2>
            <p>新しいエピソードを下記より購読できます.</p>
            <ul>
            <li><FontAwesomeIcon icon={faApple} className={styles.footer_subscribe_icon} /> <a href="https://podcasts.apple.com/us/podcast/momit-fm/id1589345170">Apple Podcasts</a></li>
            <li><FontAwesomeIcon icon={faGoogle} className={styles.footer_subscribe_icon} /> <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy82ZDAyZjI4NC9wb2RjYXN0L3Jzcw">Google Podcasts</a></li>
            <li><FontAwesomeIcon icon={faAmazon} className={styles.footer_subscribe_icon} /> <a href="https://music.amazon.co.jp/podcasts/b355900d-b05b-4366-83ae-d7bf3a22d84a/momit-fm">Amazon Podcast</a></li>
            <li><FontAwesomeIcon icon={faSpotify} className={styles.footer_subscribe_icon} /> <a href="https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX">Spotify</a></li>
            <li><FontAwesomeIcon icon={faPodcast} className={styles.footer_subscribe_icon} /> <a href="https://anchor.fm/momitfm/episodes/1-e18cb2k">Anchor</a></li>            
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
