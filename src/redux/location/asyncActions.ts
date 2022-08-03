import { createAsyncThunk } from '@reduxjs/toolkit';
import { mortyAPI } from '../../api/api';
import { LocationType } from './types';

export const getLocationById = createAsyncThunk<LocationType, number>(
    'location/getLocationById',
    async (id) => {
        const { data } = await mortyAPI.getLocationById(id);
        return data;
    }
);