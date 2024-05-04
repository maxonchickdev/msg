export interface RegistrationUser {
  name: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface IForgotPassword {
  email: string
}
export interface ICheckCode {
  code: string
  email: string
}

export interface INewPassword {
  password: string
  one_more_password: string
  email: string
}
