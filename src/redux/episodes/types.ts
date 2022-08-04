
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
  created: string;
};

export type EpisodesType = {
  info: InfoType;
  results: EpisodeType[];
};

export type EpisodeState = {
  info: InfoType;
  results: SeasonType[];
  searchValue: string;
  sort: SortItem;
  currEpisode: EpisodeType | null;
};

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export enum SortPropertyEnum {
  TITLE_DESC = 'titleDesc',
  TITLE_ASC = 'titleAsc',
  DATE_DESC = 'dateDesc',
  DATE_ASC = 'dateAsc',
}
