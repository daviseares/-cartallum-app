import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backendcartallum.herokuapp.com/'
   
})


export default api;