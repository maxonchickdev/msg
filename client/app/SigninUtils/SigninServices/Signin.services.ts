import { axiosInstance } from "@/app/axios/axios.setup"
import { AxiosError } from "axios"
import { ILogin } from "../SigninInterfaces/Signin.interfaces"

export const SigninServices = {
  login: async (loginUser: ILogin): Promise<{ status: number }> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_SIGNIN_BASIC,
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

  refresh: async (): Promise<void> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_SIGNIN_REFRESH,
        method: "get",
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
