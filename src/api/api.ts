import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

export const mortyAPI = {
  getEpisodes(page: number) {
    return instance.get(`episode?page=${page}`);
  },
  getEpisodeById(id: number) {
    return instance.get(`episode/${id}`);
  },
  getCharacterById(id: number) {
    return instance.get(`character/${id}`);
  },
  getCharacters(params: string[]) {
    return instance.get(`character/${JSON.stringify(params)}`);
  },
};
