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

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const visiblePages = new Set([
    1,
    totalPages,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  if (currentPage <= 3) {
    visiblePages.add(2);
    visiblePages.add(3);
  }

  if (currentPage >= totalPages - 2) {
    visiblePages.add(totalPages - 2);
    visiblePages.add(totalPages - 1);
  }

  return Array.from(visiblePages)
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

export default function EpisodeArchive({
  episodes,
  currentPage,
  totalPages,
}: EpisodeArchiveProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

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
          aria-labelledby="episode-pagination-title"
        >
          <div className={styles.pagination_header}>
            <h2
              className={styles.pagination_title}
              id="episode-pagination-title"
            >
              Archive navigation
            </h2>
            <p className={styles.pagination_status}>
              Page {currentPage} of {totalPages}
            </p>
          </div>
          <div className={styles.pagination_controls}>
            {currentPage > 1 ? (
              <Link
                className={styles.pagination_button}
                href={getPageHref(currentPage - 1)}
              >
                <span aria-hidden="true">←</span>
                <span>Newer episodes</span>
                <span className={styles.pagination_button_page}>
                  Page {currentPage - 1}
                </span>
              </Link>
            ) : (
              <span
                className={`${styles.pagination_button} ${styles.pagination_button_disabled}`}
                aria-disabled="true"
              >
                <span aria-hidden="true">←</span>
                <span>Newer episodes</span>
              </span>
            )}
            <div className={styles.pagination_pages} aria-label="Archive pages">
              {visiblePages.map((page, index) => {
                const previousPage = visiblePages[index - 1];
                const showGap = previousPage && page - previousPage > 1;

                return (
                  <span className={styles.pagination_page_group} key={page}>
                    {showGap && (
                      <span
                        className={styles.pagination_ellipsis}
                        aria-hidden="true"
                      >
                        ...
                      </span>
                    )}
                    {page === currentPage ? (
                      <span
                        className={`${styles.pagination_page} ${styles.pagination_page_current}`}
                        aria-current="page"
                      >
                        {page}
                      </span>
                    ) : (
                      <Link
                        className={styles.pagination_page}
                        href={getPageHref(page)}
                        aria-label={`Go to archive page ${page}`}
                      >
                        {page}
                      </Link>
                    )}
                  </span>
                );
              })}
            </div>
            {currentPage < totalPages ? (
              <Link
                className={styles.pagination_button}
                href={getPageHref(currentPage + 1)}
              >
                <span>Older episodes</span>
                <span className={styles.pagination_button_page}>
                  Page {currentPage + 1}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <span
                className={`${styles.pagination_button} ${styles.pagination_button_disabled}`}
                aria-disabled="true"
              >
                <span>Older episodes</span>
                <span aria-hidden="true">→</span>
              </span>
            )}
          </div>
          {currentPage > 1 && (
            <Link className={styles.pagination_latest} href="/">
              Back to latest episodes
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
