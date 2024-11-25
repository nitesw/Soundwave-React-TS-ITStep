import axios from "axios";
import { tokenService } from "./token.service";

const createApiService = (baseURL: string) => {
  const api = axios.create({ baseURL });

  api.interceptors.request.use(
    (config) => {
      const token = tokenService.get();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};

export default createApiService;
