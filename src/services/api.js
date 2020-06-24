import axios from 'axios';

const api = axios.create({
    baseURL: 'https://familia-alegre.herokuapp.com/'   
})


export default api;