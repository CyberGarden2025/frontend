import axios, { type AxiosInstance } from 'axios';

export let authAxios: AxiosInstance = axios.create();

export const apiService = {
    setup(token: string) {
        authAxios = axios.create({
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
    },
};
