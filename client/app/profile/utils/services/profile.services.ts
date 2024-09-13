import { axiosInstance } from "@/app/axios/axios.setup";
import { AxiosError } from "axios";
import { IProfile } from "../interfaces/profile.interfaces";

export const Services = {
  profile: async (): Promise<{ data: IProfile }> => {
    try {
      const res = await axiosInstance<IProfile>({
        url: process.env.SERVER_PROFILE,
        method: "get",
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
      const res = await axiosInstance({
        url: process.env.SERVER_UPLOAD_AVATAR,
        method: "post",
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
