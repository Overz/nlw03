import axios from 'axios';

export const api = axios.create({ baseURL: 'http://backend-srv:3000' });
