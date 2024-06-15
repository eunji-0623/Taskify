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

// 요청 인터셉터를 추가하여 매 요청 시마다 토큰을 헤더에 추가
instance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
