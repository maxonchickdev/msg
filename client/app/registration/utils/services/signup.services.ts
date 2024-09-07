import axios, { AxiosError } from "axios";
import { IRegistrate } from "../interfaces/signup.interfaces";

export const Services = {
  registrate: async (
    registrateUser: IRegistrate
  ): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_BASIC_SIGNUP,
        method: "post",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        data: registrateUser,
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
