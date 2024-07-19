import axios, { AxiosError } from 'axios'
import { ILogin, IProfile, IRegistrate } from '../utils/interfaces/interfaces'

export const LoginRegistrateService = {
  login: async (
    loginUser: ILogin
  ): Promise<{ status: number; message: string }> => {
    try {
      const res = await axios<{
        message: string
      }>({
        url: '/login',
        method: 'post',
        baseURL: 'http://localhost:8080/api',
        headers: {
          'Content-Type': 'application/json'
        },
        data: loginUser,
        withCredentials: true
      })
      return {
        status: res.status,
        message: res.data.message
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        return {
          status: err.response?.status!,
          message: err.response?.data.message
        }
      }
      return { status: 500, message: 'Internal server error' }
    }
  },

  registrate: async (
    registrateUser: IRegistrate
  ): Promise<{ status: number; message: string }> => {
    try {
      const res = await axios<{ message: string }>({
        url: '/users',
        method: 'post',
        baseURL: 'http://localhost:8080/api',
        headers: {
          'Content-Type': 'application/json'
        },
        data: registrateUser
      })
      return { status: res.status, message: res.data.message }
    } catch (err) {
      if (err instanceof AxiosError) {
        return {
          status: err.response?.status!,
          message: err.response?.data.message
        }
      }
      return { status: 500, message: 'Internal server error' }
    }
  },

  profile: async (): Promise<{
    status: number
    message: string | IProfile
  }> => {
    try {
      const res = await axios<{
        statusCode: number
        message: string | IProfile
      }>({
        url: '/profile',
        method: 'get',
        baseURL: 'http://localhost:8080/api',
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      return { status: res.status, message: res.data.message }
    } catch (err) {
      if (err instanceof AxiosError) {
        return {
          status: err.response?.status!,
          message: err.response?.data.message
        }
      }
      return { status: 500, message: 'Internal server error' }
    }
  },

  validate: async (
    email: string,
    code: string
  ): Promise<{ status: number; message: string }> => {
    try {
      const res = await axios<{ message: string }>({
        url: `/users/verified?email=${email}&code=${code}`,
        method: 'post',
        baseURL: 'http://localhost:8080/api',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json'
        }
      })
      return { status: res.status, message: res.data.message }
    } catch (err) {
      if (err instanceof AxiosError) {
        return {
          status: err.response?.status!,
          message: err.response?.data.message
        }
      }
      return { status: 500, message: 'Internal server error' }
    }
  }
}
