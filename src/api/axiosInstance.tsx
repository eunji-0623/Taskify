import axios from 'axios';

const BASE_URL = 'https://sp-taskify-api.vercel.app';
const TEAM_ID = '5-8';
const token = localStorage.getItem('Token');

const instance = axios.create({
  baseURL: `${BASE_URL}/${TEAM_ID}/`,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default instance;
