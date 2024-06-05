import axios from 'axios';

const TEAM_ID = '5-8';

const instance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/${TEAM_ID}/`,
});

export default instance;
