import axios from 'axios'
import {
  ICheckCode,
  IForgotPassword,
  INewPassword,
  LoginUser,
  RegistrationUser,
} from '../interfaces/Interfaces'

export const Services = {
  async registrateUser(regUser: RegistrationUser) {
    const response = await axios.post<RegistrationUser>(
      'http://localhost:8000/api/auth/',
      regUser
    )
    return response.data['detail']
  },
  async loginUser(logUser: LoginUser) {
    const response = await axios.post<LoginUser>(
      'http://localhost:8000/api/login/',
      logUser
    )
    return response.data['detail']
  },
  async forgotPassword(data: IForgotPassword) {
    const response = await axios.post<IForgotPassword>(
      'http://localhost:8000/api/password/',
      data
    )
    return response.data['detail']
  },
  async checkCode(data: ICheckCode) {
    const response = await axios.post<ICheckCode>(
      'http://localhost:8000/api/code/',
      data
    )
    return response.data['detail']
  },
  async updatePassword(data: INewPassword) {
    const response = await axios.post<INewPassword>(
      'http://localhost:8000/api/new-password/',
      data
    )
    return response.data['detail']
  },
  async getUser(email: string) {
    const response = await axios.post<string>(
      'http://localhost:8000/api/find-user-by-email/',
      email
    )
    return response.data['detail']
  },
}
