import axios from 'axios';

const api = axios.create({
    baseURL: `https://bd2app.herokuapp.com`,
});

export default api;