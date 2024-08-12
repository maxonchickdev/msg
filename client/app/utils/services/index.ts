import axios, { AxiosError } from "axios";
import { ILogin } from "../interfaces/index";

export const Services = {
  login: async (loginUser: ILogin): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_BASIC_AUTH,
        method: "post",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        data: loginUser,
        withCredentials: true,
      });
      return { status: res.status };
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error("Internal server error").message;
    }
  },
};
