import axios from 'axios';

const TEAM_ID = '5-8';
const token = localStorage.getItem('Token');

const instance = axios.create({
  baseURL: `https://sp-taskify-api.vercel.app/${TEAM_ID}/`,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default instance;
