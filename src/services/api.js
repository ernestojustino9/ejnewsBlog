import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  // baseURL: "https://ejportifolioapi.onrender.com/api/",
  baseURL: "https://ejportifolioapi.onrender.com/api/",
});

api.interceptors.request.use(async (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

export default api;
