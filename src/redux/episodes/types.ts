type InfoType = {
  pages: number;
  next: string | null;
  prev: string | null;
};

export type SeasonType = {
  number: string;
  episodes: EpisodeType[];
};

export type EpisodeType = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
};

export type EpisodesType = {
  info: InfoType;
  results: EpisodeType[];
};

export type EpisodeState = {
  info: InfoType;
  results: SeasonType[];
  currEpisode: EpisodeType;
};
