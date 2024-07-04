import axios, { AxiosError } from 'axios'
import { ILogin, IRegistrate } from '../interfaces/interfaces'

export const LoginRegistrateService = {
  login: async (
    loginUser: ILogin
  ): Promise<{ statusCode: number; message: string }> => {
    try {
      const res = await axios.post<{ statusCode: number; message: string }>(
        'http://localhost:8080/api/login',
        loginUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return { statusCode: res.status, message: res.data.message }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        return {
          statusCode: err.response?.status,
          message: err.response?.data.message,
        }
      }
      return { statusCode: 500, message: 'Internal server error' }
    }
  },

  registrate: async (
    registrateUser: IRegistrate
  ): Promise<{ status: number; msg: string }> => {
    try {
      const res = await axios.post<{ status: number; msg: string }>(
        'http://localhost:8080/users',
        registrateUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(res.config, res.data, res.headers, res.status)
      return { status: res.status, msg: res.data.msg }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return { status: 500, msg: 'Internal server error' }
      }
      return { status: 500, msg: 'Internal server erorr' }
    }
  },
}
