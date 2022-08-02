type InfoType = {
    page: number;
    next: string | null;
    prev: string | null;
}

type ResultType = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
}

export type EpisodesType = {
    info: InfoType;
    results: ResultType[];
}

export type EpisodeState = {
    data: EpisodesType;
}