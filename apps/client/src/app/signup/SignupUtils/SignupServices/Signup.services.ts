import { AxiosError } from 'axios';
import { axiosInstance } from '../../../axios/axios.setup';
import { IRegistrate } from '../SignupInterfaces/Signup.interfaces';

export const SignupServices = {
  registrate: async (
    registrateUser: IRegistrate
  ): Promise<{ status: number }> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_BASIC_SIGNUP,
        method: 'post',
        data: registrateUser,
      });
      return { status: res.status };
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error('Internal server error').message;
    }
  },
};
