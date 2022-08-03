import { createSlice } from '@reduxjs/toolkit';
import { EpisodeState, EpisodesType, EpisodeType, SeasonType } from './types';
import { getEpisodeById, getEpisodes, getEpisodesByArray } from './asyncActions';


const getSeasons = (array: EpisodeType[]): SeasonType[] => {

  const regex = /(?<=S).*?(?=E)/;

  const firstSeason = String(regex.exec(array[0].episode));
  const seasons: SeasonType[] = [];
  let season: SeasonType = {
    number: firstSeason,
    episodes: [],
  };
  array.forEach((item) => {
    if (String(regex.exec(item.episode)) === season.number) {
      season.episodes.push(item);
    } else {
      seasons.push(season);
      season = {
        number: String(regex.exec(item.episode)),
        episodes: [item],
      };
    }
  });
  seasons.push(season);

  return seasons;
}

const initialState: EpisodeState = {
  info: { pages: 1, next: null, prev: null },
  results: [],
  currEpisode: {
    id: 1,
    name: '',
    air_date: '',
    episode: '',
    characters: [],
  },
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.info = action.payload.info;

      state.results = getSeasons(action.payload.results);
    });
    builder.addCase(getEpisodeById.fulfilled, (state, action) => {
      state.currEpisode = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getEpisodesByArray.fulfilled, (state, action) => {
      state.results = getSeasons(action.payload);
    });
  },
});

//export const {  } = episodesSlice.actions;
export default episodesSlice.reducer;
