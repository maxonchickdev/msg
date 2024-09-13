import { axiosInstance } from "@/app/axios/axios.setup";
import { AxiosError } from "axios";
import { ILogin } from "../interfaces/signin.interfaces";

export const Services = {
  login: async (loginUser: ILogin): Promise<{ status: number }> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_BASIC_SIGNIN,
        method: "post",
        data: loginUser,
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
