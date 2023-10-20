import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast, faRssSquare } from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faSpotify,
  faApple,
  faAmazon,
} from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Home.module.css";
import { rssUrl, siteDescription } from "../const";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <section className={styles.footer_section}>
          <h2>momit.fmとは</h2>
          <p>momit.fmは、{siteDescription}</p>
          <p>
            momit.fm のWebメディア <a href="https://hub.momit.fm/">momit hub</a>{" "}
            では momit.fm でお話しした内容を記事にしています.
          </p>
        </section>
        <section className={styles.footer_section}>
          <h2>Feedback</h2>
          <p>
            momit.fmへの感想や質問などはTwitter{" "}
            <a href="https://twitter.com/search?q=%23momitfm">#momitfm</a>{" "}
            または
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfwtvdBRjwhWyI4wvpX42knaLbQ3Ac05XVwd0mr4GFvYmT1wg/viewform">
              お便りフォーム
            </a>
            までお寄せください.
          </p>
        </section>
        <section className={styles.footer_section}>
          <h2>購読</h2>
          <p>新しいエピソードを下記より購読できます.</p>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={faApple}
                className={styles.footer_subscribe_icon}
              />{" "}
              <a href="https://podcasts.apple.com/us/podcast/momit-fm/id1589345170">
                Apple Podcasts
              </a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faGoogle}
                className={styles.footer_subscribe_icon}
              />{" "}
              <a href="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy82ZDAyZjI4NC9wb2RjYXN0L3Jzcw">
                Google Podcasts
              </a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faAmazon}
                className={styles.footer_subscribe_icon}
              />{" "}
              <a href="https://music.amazon.co.jp/podcasts/b355900d-b05b-4366-83ae-d7bf3a22d84a/momit-fm">
                Amazon Podcast
              </a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faSpotify}
                className={styles.footer_subscribe_icon}
              />{" "}
              <a href="https://open.spotify.com/show/5F2ppZb8gxJngLlO6wlIqX">
                Spotify
              </a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faPodcast}
                className={styles.footer_subscribe_icon}
              />{" "}
              <a href="https://anchor.fm/momitfm/episodes/1-e18cb2k">Anchor</a>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faRssSquare}
                className={styles.footer_subscribe_icon}
              />{" "}
              <a href={rssUrl}>RSS</a>
            </li>
          </ul>
        </section>
      </div>
      <span className={styles.footer_copyright}>Copyright © momit.fm</span>
    </footer>
  );
}
