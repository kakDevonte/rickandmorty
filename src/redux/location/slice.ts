import { createSlice } from '@reduxjs/toolkit';
import { getLocationById } from './asyncActions';
import {LocationState, LocationType } from './types';

const initialState: LocationState = {
    location: {
        id: 1,
        name: '',
        type: '',
        dimension: '',
        residents: [],
    }
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getLocationById.fulfilled, (state, action) => {
            state.location = action.payload;
        })
    },
});

export default locationSlice.reducer;
