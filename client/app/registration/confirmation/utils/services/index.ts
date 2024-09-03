import axios, { AxiosError } from "axios";
import { IConfirmation, IResendConfirmationCode } from "../interfaces/index";

export const Services = {
  confirm: async (
    confirmationData: IConfirmation
  ): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_BASIC_SIGNUP_CONFIRM,
        method: "post",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        data: confirmationData,
      });
      return { status: res.status };
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error("Internal server error").message;
    }
  },

  resendConfirmationCode: async (
    resendConfirmationCode: IResendConfirmationCode
  ): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_BASIC_SIGNUP_RESEND,
        method: "post",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        data: resendConfirmationCode,
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
