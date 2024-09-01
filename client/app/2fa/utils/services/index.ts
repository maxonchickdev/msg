import axios, { AxiosError } from "axios";
import { TwofaCode } from "../interfaces";

export const Services = {
  qr: async (): Promise<string> => {
    try {
      const res = await axios({
        url: process.env.SERVER_QR,
        method: "get",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error("Internal server error").message;
    }
  },

  turnOnTwofa: async (code: TwofaCode): Promise<boolean> => {
    try {
      const res = await axios({
        url: process.env.SERVER_TWO_FA_ON,
        method: "post",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error("Internal server error").message;
    }
  },
};
