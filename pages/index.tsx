import { siteDescription } from "../const";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "../components/Head";
import EpisodeArchive from "../components/EpisodeArchive";
import {
  fetchEpisodes,
  getEpisodeSummariesForPage,
  getTotalPages,
  type EpisodeSummary,
} from "../util/rss";

type HomeProps = {
  episodes: EpisodeSummary[];
  totalPages: number;
};

export async function getStaticProps() {
  const episodes = await fetchEpisodes();

  return {
    props: {
      episodes: getEpisodeSummariesForPage(episodes, 1),
      totalPages: getTotalPages(episodes.length),
    },
  };
}

export default function Home({ episodes, totalPages }: HomeProps) {
  return (
    <div>
      <Head title="momit.fm" description={siteDescription}></Head>
      <Header></Header>
      <EpisodeArchive
        episodes={episodes}
        currentPage={1}
        totalPages={totalPages}
      />
      <Footer></Footer>
    </div>
  );
}
