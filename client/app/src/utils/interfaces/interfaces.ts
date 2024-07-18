import { SubmitHandler } from 'react-hook-form'

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

export interface RegistrationFormProps {
  onSubmitUserInfo: SubmitHandler<IRegistrate>
  isLoading: boolean
  isDisabled: boolean
}

export interface ValidationFormProps {
  onSubmitCode: SubmitHandler<IVerificationCode>
  isLoading: boolean
  isDisabled: boolean
}

export interface LoginFormProps {
  onSubmitLogin: SubmitHandler<ILogin>
  isLoading: boolean
}

export interface ILinkTo {
  content: string
  href: string
}
