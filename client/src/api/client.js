import axios from "axios";
import { LOCAL_API_BASE } from "../config.js";

export const createApiClient = (getToken) => {
  const instance = axios.create({
    baseURL: LOCAL_API_BASE
  });

  instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};


