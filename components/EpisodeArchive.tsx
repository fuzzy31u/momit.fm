import Link from "next/link";
import type { EpisodeSummary } from "../util/rss";
import { getPageHref } from "../util/rss";
import { formatDate } from "../util";
import styles from "../styles/Home.module.css";

type EpisodeArchiveProps = {
  episodes: EpisodeSummary[];
  currentPage: number;
  totalPages: number;
};

export default function EpisodeArchive({
  episodes,
  currentPage,
  totalPages,
}: EpisodeArchiveProps) {
  return (
    <main className={styles.main}>
      {episodes.map((item) => (
        <article key={`ep-${item.id}`}>
          <h2 className={styles.main_title}>
            <Link href={`/episode/${item.id}`}>{item.title[0]}</Link>
          </h2>
          <p className={styles.main_date}>{formatDate(item.pubDate)}</p>
        </article>
      ))}
      {totalPages > 1 && (
        <nav
          className={styles.pagination}
          aria-label="Episode archive pagination"
        >
          {currentPage > 1 && (
            <Link
              className={styles.pagination_link}
              href={getPageHref(currentPage - 1)}
            >
              Newer episodes
            </Link>
          )}
          <span className={styles.pagination_status}>
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages && (
            <Link
              className={styles.pagination_link}
              href={getPageHref(currentPage + 1)}
            >
              Older episodes
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
