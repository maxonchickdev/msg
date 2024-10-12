import axios from "axios"
import { SigninServices } from '../SigninUtils/SigninServices/Signin.services'


export const axiosInstance = axios.create({
  baseURL: 'http://' + process.env.SERVER_HOST + ':' + process.env.SERVER_PORT + '/',
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
        await SigninServices.refresh();
        return axiosInstance(error.config);
      } catch (e) {
        return Promise.reject(error);
      }
    }
  }
);
