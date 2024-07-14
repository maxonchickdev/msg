import axios, { AxiosError } from 'axios'
import { ILogin, IProfile, IRegistrate } from '../interfaces/interfaces'

export const LoginRegistrateService = {
  login: async (
    loginUser: ILogin
  ): Promise<{ statusCode: number; token: string; message: string }> => {
    try {
      const res = await axios<{
        statusCode: number
        token: string
        message: string
      }>({
        url: '/api/login',
        method: 'post',
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json',
        },
        data: loginUser,
      })
      return {
        statusCode: res.status,
        token: res.data.token,
        message: res.data.message,
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        return {
          statusCode: err.response?.status,
          token: err.response?.data.token,
          message: err.response?.data.message,
        }
      }
      return { statusCode: 500, token: '', message: 'Internal server error' }
    }
  },

  registrate: async (
    registrateUser: IRegistrate
  ): Promise<{ statusCode: number; message: string }> => {
    try {
      const res = await axios<{ statusCode: number; message: string }>({
        url: '/users',
        method: 'post',
        baseURL: 'http://localhost:8080',
        headers: {
          'Content-Type': 'application/json',
        },
        data: registrateUser,
      })
      return { statusCode: res.data.statusCode, message: res.data.message }
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

  profile: async (
    token: string
  ): Promise<{ statusCode: number; message: string | IProfile }> => {
    try {
      const res = await axios<{
        statusCode: number
        message: string | IProfile
      }>({
        url: '/api/profile',
        method: 'get',
        baseURL: 'http://localhost:8080',
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${token}`,
        },
      })
      return { statusCode: res.data.statusCode, message: res.data.message }
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
}
