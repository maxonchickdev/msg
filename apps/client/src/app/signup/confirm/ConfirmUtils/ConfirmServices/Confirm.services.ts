import { AxiosError } from 'axios';
import { axiosInstance } from '../../../../../../src/app/axios/axios.setup';
import {
  IConfirmation,
  IResendConfirmationCode,
} from '../ConfirmInterfaces/Confirm.interfaces';

export const ConfirmServices = {
  confirm: async (
    confirmationData: IConfirmation
  ): Promise<{ status: number }> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_SIGNUP_CONFIRM,
        method: 'post',
        data: confirmationData,
      });
      return { status: res.status };
    } catch (err) {
      if (err instanceof AxiosError && err.response) {
        throw new Error(err.response.data.message).message;
      }
      throw new Error('Internal server error').message;
    }
  },

  resendConfirmationCode: async (
    resendConfirmationCode: IResendConfirmationCode
  ): Promise<{ status: number }> => {
    try {
      const res = await axiosInstance({
        url: process.env.SERVER_SIGNUP_RESEND_CODE,
        method: 'post',
        data: resendConfirmationCode,
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
