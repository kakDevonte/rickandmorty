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

/**
 * Функция для группировки эпизодов по сезонам.
 * @param array массив эпизодов.
 */
const getSeasons = (array: EpisodeType[]): SeasonType[] => {
  const regex = /(?<=S).*?(?=E)/;
  const firstNumberSeason: string = String(regex.exec(array[0].episode));
  const seasons: SeasonType[] = [];
  let season: SeasonType = {
    number: firstNumberSeason,
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

/**
 * Сортировка списка в указанном порядке с указанием параметра, по которому происходит сортировка.
 * @param array входной массив для сортировки.
 * @param type порядок сортировки.
 * @param func колбек функция, возвращающая параметр, по которому происходит сортировка.
 */
const sortBy = (array: SeasonType[], type: 'asc' | 'desc', func: (ep: EpisodeType) => string): SeasonType[] => {
  const sortedEpisodes: SeasonType[] = [];
  array.forEach((season) => {
    const sortList = [...season.episodes].sort((a, b) => {
          if(type === 'desc')
            return func(b) > func(a) ? 1 : -1;
          if(type === 'asc')
            return func(b) < func(a) ? 1 : -1;
          return 0;
        });
    sortedEpisodes.push({ number: season.number, episodes: sortList });
  });
  return sortedEpisodes;
}

const sortEpisodes = (array: SeasonType[], type: SortItem): SeasonType[] => {
  let sortedEpisodes: SeasonType[] = [];
  switch (type.sortProperty) {
    case SortPropertyEnum.TITLE_DESC: {
      sortedEpisodes = sortBy(array, 'desc', ep => ep.name);
      break;
    }
    case SortPropertyEnum.TITLE_ASC: {
      sortedEpisodes = sortBy(array, 'asc', ep => ep.name);
      break;
    }
    case SortPropertyEnum.DATE_DESC: {
      sortedEpisodes = sortBy(array, 'desc', ep => ep.created);
      break;
    }
    case SortPropertyEnum.DATE_ASC: {
      sortedEpisodes = sortBy(array, 'asc', ep => ep.created);
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
