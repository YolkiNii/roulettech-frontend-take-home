import axios, { Axios } from 'axios';

export const BASE_URL: string = 'http://13.239.134.145:8000/playground/';

const baseAPI: Axios = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export default baseAPI;