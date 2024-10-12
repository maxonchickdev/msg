import { AxiosError } from 'axios';
import { axiosInstance } from '../../../axios/axios.setup';
import { TwofaCode } from '../TwofaInterfaces/Twofa.interfaces';

export const TwofaServices = {
  qr: async (): Promise<string> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_TWOFA_QR,
        method: 'post',
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error('Internal server error').message;
    }
  },

  turnOnTwofa: async (code: TwofaCode): Promise<boolean> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_TWOFA_TURN_ON,
        method: 'post',
        data: code,
      });
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error('Internal server error').message;
    }
  },
};
