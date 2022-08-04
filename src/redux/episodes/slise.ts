import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import {
  EpisodeState,
  EpisodeType,
  SeasonType,
  SortItem,
  SortPropertyEnum,
} from './types';
import {
  getEpisodeById,
  getEpisodes,
  getEpisodesByArray,
  searchEpisodes,
} from './asyncActions';

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
};

const sortEpisodes = (array: SeasonType[], type: SortItem): SeasonType[] => {
  const sortedEpisodes: SeasonType[] = [];
  switch (type.sortProperty) {
    case SortPropertyEnum.TITLE_DESC: {
      array.forEach((season) => {
        const sortList = [...season.episodes].sort((a, b) => {
          if (b.name > a.name) return 1;
          if (b.name < a.name) return -1;
          return 0;
        });
        sortedEpisodes.push({ number: season.number, episodes: sortList });
      });
      break;
    }
    case SortPropertyEnum.TITLE_ASC: {
      array.forEach((season) => {
        const sortList = [...season.episodes].sort((a, b) => {
          if (b.name < a.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        });
        sortedEpisodes.push({ number: season.number, episodes: sortList });
      });
      break;
    }
    case SortPropertyEnum.DATE_DESC: {
      array.forEach((season) => {
        const sortList = [...season.episodes].sort((a, b) => {
          if (new Date(b.created) > new Date(a.created)) return 1;
          if (new Date(b.created) < new Date(a.created)) return -1;
          return 0;
        });
        sortedEpisodes.push({ number: season.number, episodes: sortList });
      });
      break;
    }
    case SortPropertyEnum.DATE_ASC: {
      array.forEach((season) => {
        const sortList = [...season.episodes].sort((a, b) => {
          if (new Date(b.created) < new Date(a.created)) return 1;
          if (new Date(b.created) > new Date(a.created)) return -1;
          return 0;
        });
        sortedEpisodes.push({ number: season.number, episodes: sortList });
      });
      break;
    }
  }
  return sortedEpisodes;
};

const initialState: EpisodeState = {
  info: { pages: 1, next: null, prev: null },
  results: [],
  searchValue: '',
  sort: { name: 'date(ASC)', sortProperty: SortPropertyEnum.DATE_ASC },
  currEpisode: null,
};

const episodesSlice = createSlice({
  name: 'episodes',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
      state.results = sortEpisodes(current(state.results), state.sort);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEpisodes.fulfilled, (state, action) => {
      state.info = action.payload.info;
      const seasons = getSeasons(action.payload.results);
      state.results = sortEpisodes(seasons, state.sort);
    });
    builder.addCase(getEpisodeById.fulfilled, (state, action) => {
      state.currEpisode = action.payload;
    });
    builder.addCase(getEpisodeById.rejected, (state) => {
      state.currEpisode = null;
    });
    builder.addCase(getEpisodesByArray.fulfilled, (state, action) => {
      const seasons = getSeasons(action.payload);
      state.results = sortEpisodes(seasons, state.sort);
    });
    builder.addCase(searchEpisodes.fulfilled, (state, action) => {
      state.info = action.payload.info;
      const seasons = getSeasons(action.payload.results);
      state.results = sortEpisodes(seasons, state.sort);
    });
    builder.addCase(searchEpisodes.rejected, (state) => {
      state.info = initialState.info;
      state.results = [];
    });
  },
});

export const { setSearchValue, setSort } = episodesSlice.actions;
export default episodesSlice.reducer;
