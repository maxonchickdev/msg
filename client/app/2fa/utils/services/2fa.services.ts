import { axiosInstance } from "@/app/axios/axios.setup";
import { AxiosError } from "axios";
import { TwofaCode } from "../interfaces/2fa.interfaces";

export const Services = {
  qr: async (): Promise<string> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_QR,
        method: "post",
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
      const res = await axiosInstance({
        url: process.env.SERVER_TWO_FA_ON,
        method: "post",
        data: code,
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
