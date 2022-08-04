import { createSlice } from '@reduxjs/toolkit';
import { getLocationById } from './asyncActions';
import { LocationState } from './types';

const initialState: LocationState = {
  location: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLocationById.fulfilled, (state, action) => {
      state.location = action.payload;
    });
    builder.addCase(getLocationById.rejected, (state) => {
      state.location = null;
    });
  },
});

export default locationSlice.reducer;
