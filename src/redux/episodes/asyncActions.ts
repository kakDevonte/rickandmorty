import { createAsyncThunk } from '@reduxjs/toolkit';
import { EpisodesType, EpisodeType } from './types';
import { mortyAPI } from '../../api/api';

export const getEpisodes = createAsyncThunk<EpisodesType, number>(
  'auth/getEpisodes',
  async (page) => {
    const { data } = await mortyAPI.getEpisodes(page);
    return data;
  }
);

export const getEpisodeById = createAsyncThunk<EpisodeType, number>(
  'auth/getEpisodeById',
  async (id) => {
    const { data } = await mortyAPI.getEpisodeById(id);
    return data;
  }
);
