import { createSlice } from '@reduxjs/toolkit';
import { CharacterState } from './types';
import { getCharacterById, getCharacters } from './asyncActions';

const initialState: CharacterState = {
  characters: [],
  currCharacter: null,
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCharacterById.fulfilled, (state, action) => {
      state.currCharacter = action.payload;
    });
    builder.addCase(getCharacterById.rejected, (state) => {
      state.currCharacter = null;
    });
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
    builder.addCase(getCharacters.rejected, (state) => {
      state.characters = [];
    });
  },
});

export default characterSlice.reducer;
