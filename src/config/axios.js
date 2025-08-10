import axios from "axios";

const clienteAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export default clienteAxios;
