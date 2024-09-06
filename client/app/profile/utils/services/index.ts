import axios, { AxiosError } from "axios";
import { IProfile } from "../interfaces/index";

export const Services = {
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

  uploadAvatar: async (formData: FormData): Promise<any> => {
    try {
      const res = await axios({
        url: process.env.SERVER_UPLOAD_AVATAR,
        method: "post",
        baseURL: process.env.SERVER_ORIGIN,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        data: formData,
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
