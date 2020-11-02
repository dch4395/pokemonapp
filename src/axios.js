import axios from "axios";

let instance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
});

export default instance;
