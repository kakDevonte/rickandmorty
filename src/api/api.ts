import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/',
});

export const mortyAPI = {
    getEpisodes(page: number) {
        return instance.get(`episode?page=${page}`);
    },
};