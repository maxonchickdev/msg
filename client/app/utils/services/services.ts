import axios, { AxiosError } from "axios";
import {
  IConfirmation,
  ILogin,
  IProfile,
  IRegistrate,
  IResendConfirmationCode,
} from "../../utils/interfaces/interfaces";

export const LoginRegistrateService = {
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

  registrate: async (
    registrateUser: IRegistrate,
  ): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_BASIC_REG,
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

  confirm: async (
    confirmationData: IConfirmation,
  ): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_BASIC_REG_CONFIRM,
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
    resendConfirmationCode: IResendConfirmationCode,
  ): Promise<{ status: number }> => {
    try {
      const res = await axios({
        url: process.env.SERVER_RESEND,
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

  profile: async (): Promise<{ data: IProfile }> => {
    try {
      const res = await axios<IProfile>({
        url: process.env.SERVER_PROFILE,
        method: "get",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return { data: res.data };
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error("Internal server error").message;
    }
  },
};
