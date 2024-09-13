import { axiosInstance } from "@/app/axios/axios.setup";
import { AxiosError } from "axios";
import { IRegistrate } from "../interfaces/signup.interfaces";

export const Services = {
  registrate: async (
    registrateUser: IRegistrate
  ): Promise<{ status: number }> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_BASIC_SIGNUP,
        method: "post",
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
