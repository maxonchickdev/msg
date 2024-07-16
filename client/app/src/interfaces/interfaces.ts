export interface IRegistrate {
  username: string
  email: string
  password: string
}

export interface ILogin extends Omit<IRegistrate, 'username'> {}

export interface IProfile extends Omit<IRegistrate, 'password'> {}

export interface INotify {
  status: number
  message: string
  icon: string
}

export interface IVerificationCode {
  code: string
}
