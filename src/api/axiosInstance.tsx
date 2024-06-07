import axios from 'axios';

const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '5-8';

const instance = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}/`,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
