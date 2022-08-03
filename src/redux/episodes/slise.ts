import { createSlice } from '@reduxjs/toolkit';
import { EpisodeState, SeasonType } from './types';
import { getEpisodeById, getEpisodes } from './asyncActions';

const initialState: EpisodeState = {
  info: { page: 1, next: null, prev: null },
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

      const regex = /(?<=S).*?(?=E)/;

      const firstSeason = String(regex.exec(action.payload.results[0].episode));
      const seasons: SeasonType[] = [];
      let season: SeasonType = {
        number: firstSeason,
        episodes: [],
      };
      action.payload.results.forEach((item) => {
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
      state.results = seasons;
    });
    builder.addCase(getEpisodeById.fulfilled, (state, action) => {
      state.currEpisode = action.payload;
      console.log(action.payload);
    });
  },
});

//export const {  } = episodesSlice.actions;
export default episodesSlice.reducer;
