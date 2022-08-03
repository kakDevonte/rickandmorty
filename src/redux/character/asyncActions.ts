import { createAsyncThunk } from '@reduxjs/toolkit';
import { mortyAPI } from '../../api/api';
import { CharacterType } from './types';

export const getCharacterById = createAsyncThunk<CharacterType, number>(
  'character/getCharacterById',
  async (id) => {
    const { data } = await mortyAPI.getCharacterById(id);
    return data;
  }
);
export const getCharacters = createAsyncThunk<CharacterType[], string[]>(
  'character/getCharacters',
  async (params) => {
    const { data } = await mortyAPI.getCharacters(params);
    return data;
  }
);
