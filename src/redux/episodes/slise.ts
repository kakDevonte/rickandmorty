import { createSlice } from '@reduxjs/toolkit';
import { EpisodeState } from './types';
import { getEpisodes } from './asyncActions';

const initialState: EpisodeState = {
    data: {
        info: { page: 1, next: null, prev: null },
        results: [],
    }

};

const episodesSlice = createSlice({
    name: 'episodes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getEpisodes.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});

//export const {  } = episodesSlice.actions;
export default episodesSlice.reducer;