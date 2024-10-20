import { HTMLInputTypeAttribute } from 'react'
import { Control, RegisterOptions, SubmitHandler } from "react-hook-form"

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmitLogin: SubmitHandler<ILogin>;
}

export interface ISigninSubmitButtonProps {
  content: string
}

export interface ISigninFormControllerProps {
  control: Control<ILogin>
  required: string
  label: string
  type: HTMLInputTypeAttribute
  rules?: Omit<RegisterOptions<ILogin, "password">, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"> | undefined
}
