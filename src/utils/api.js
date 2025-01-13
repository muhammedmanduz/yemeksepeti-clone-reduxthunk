import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:4091" });

export default api;
