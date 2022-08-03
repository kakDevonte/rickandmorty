import { createAsyncThunk } from '@reduxjs/toolkit';
import { EpisodesType, EpisodeType } from './types';
import { mortyAPI } from '../../api/api';

export const getEpisodes = createAsyncThunk<EpisodesType, number>(
  'episodes/getEpisodes',
  async (page) => {
    const { data } = await mortyAPI.getEpisodes(page);
    return data;
  }
);

export const getEpisodeById = createAsyncThunk<EpisodeType, number>(
  'episodes/getEpisodeById',
  async (id) => {
    const { data } = await mortyAPI.getEpisodeById(id);
    return data;
  }
);

export const getEpisodesByArray = createAsyncThunk<EpisodeType[], string[]>(
  'episodes/getEpisodesByArray',
  async (params) => {
    const { data } = await mortyAPI.getEpisodesByArray(params);
    return data;
  }
);
