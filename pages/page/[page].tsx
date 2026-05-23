import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Header from "../../components/Header";
import EpisodeArchive from "../../components/EpisodeArchive";
import { siteDescription } from "../../const";
import {
  fetchEpisodes,
  getEpisodeSummariesForPage,
  getTotalPages,
  type EpisodeSummary,
} from "../../util/rss";

type EpisodePageProps = {
  episodes: EpisodeSummary[];
  currentPage: number;
  totalPages: number;
};

export async function getStaticPaths() {
  const episodes = await fetchEpisodes();
  const totalPages = getTotalPages(episodes.length);
  const paths = Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => {
    const page = i + 2;
    return { params: { page: page.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const currentPage = Number(params["page"]);
  const episodes = await fetchEpisodes();
  const totalPages = getTotalPages(episodes.length);

  return {
    props: {
      episodes: getEpisodeSummariesForPage(episodes, currentPage),
      currentPage,
      totalPages,
    },
  };
}

export default function EpisodePage({
  episodes,
  currentPage,
  totalPages,
}: EpisodePageProps) {
  return (
    <div>
      <Head
        title={`momit.fm - Page ${currentPage}`}
        description={siteDescription}
      ></Head>
      <Header></Header>
      <EpisodeArchive
        episodes={episodes}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      <Footer></Footer>
    </div>
  );
}
