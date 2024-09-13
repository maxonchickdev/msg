"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: process.env.SERVER_ORIGIN,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const cookieStore = cookies();
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      const refreshToken = cookieStore.get("refresh");
      console.log(refreshToken);
    } else {
      console.log("ping");
    }
  }
);
