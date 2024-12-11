import axios from "axios";

const clienteAxios = axios.create({
baseURL : 'http://localhost:5000' || process.env.REACT_APP_API_URL,
withCredentials:true
//baseURL: process.env.REACT_APP_API_URL
});

export default clienteAxios;