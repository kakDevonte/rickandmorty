import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/',
});

export const mortyAPI = {
  getEpisodes(page: number) {
    return instance.get(`episode?page=${page}`);
  },
  getEpisodesByArray(params: string[]) {
    return instance.get(`episode/${JSON.stringify(params)}`);
  },
  getEpisodeById(id: number) {
    return instance.get(`episode/${id}`);
  },
  searchEpisodes(page: number, value: string) {
    return instance.get(`episode/?page=${page}&name=${value}`);
  },
  getCharacterById(id: number) {
    return instance.get(`character/${id}`);
  },
  getCharacters(params: string[]) {
    return instance.get(`character/${JSON.stringify(params)}`);
  },
  getLocationById(id: number) {
    return instance.get(`location/${id}`);
  },
};
