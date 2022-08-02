import {createAsyncThunk} from '@reduxjs/toolkit';
import {EpisodesType} from './types';
import {mortyAPI} from '../../api/api';


export const getEpisodes = createAsyncThunk<EpisodesType, number >(
    'auth/getData',
    async (page) => {
        const { data } = await mortyAPI.getEpisodes(page);
        return data;
    }
);