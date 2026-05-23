import { parseStringPromise } from "xml2js";
import { rssUrl } from "../const";

export const EPISODES_PER_PAGE = 50;

export type RssEpisode = {
  title: string[];
  description: string[];
  pubDate: string;
  enclosure: { $: { url: string } }[];
  [key: string]: any;
};

export type Episode = RssEpisode & {
  id: number;
};

export type EpisodeSummary = Pick<Episode, "id" | "title" | "pubDate">;

type ParsedRss = {
  rss?: {
    channel?: {
      item?: RssEpisode[];
    }[];
  };
};

let episodesCache: Promise<Episode[]> | null = null;

async function fetchEpisodesFromRss(): Promise<Episode[]> {
  const res = await fetch(rssUrl);

  if (!res.ok) {
    throw new Error(`Failed to fetch RSS feed: ${res.status}`);
  }

  const text = await res.text();
  const parsed: ParsedRss = await parseStringPromise(text);
  const items = parsed.rss?.channel?.[0]?.item ?? [];
  const episodeCount = items.length;

  return items.map((item, index) => ({
    ...item,
    id: episodeCount - index,
  }));
}

export async function fetchEpisodes(): Promise<Episode[]> {
  if (!episodesCache) {
    episodesCache = fetchEpisodesFromRss().catch((error) => {
      episodesCache = null;
      throw error;
    });
  }

  return episodesCache;
}

export function getTotalPages(episodeCount: number): number {
  return Math.max(1, Math.ceil(episodeCount / EPISODES_PER_PAGE));
}

function getEpisodesForPage(episodes: Episode[], page: number): Episode[] {
  const start = (page - 1) * EPISODES_PER_PAGE;
  return episodes.slice(start, start + EPISODES_PER_PAGE);
}

export function getEpisodeSummariesForPage(
  episodes: Episode[],
  page: number
): EpisodeSummary[] {
  return getEpisodesForPage(episodes, page).map(({ id, title, pubDate }) => ({
    id,
    title,
    pubDate,
  }));
}

export function getEpisodeById(
  episodes: Episode[],
  id: number
): Episode | undefined {
  return episodes.find((episode) => episode.id === id);
}

export function getPageHref(page: number): string {
  return page === 1 ? "/" : `/page/${page}`;
}
