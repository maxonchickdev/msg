import axios from "axios";
import { Services } from "../utils/services/signin.services";

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      try {
        error.config._retry = true;
        await Services.refresh();
        return axiosInstance(error.config);
      } catch (e) {
        return Promise.reject(error);
      }
    }
  }
);
