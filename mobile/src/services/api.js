import axios from 'axios';

const api = axios.create({
    baseURL:"http://omnistacktestsite.herokuapp.com"
});

export default api;