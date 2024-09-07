import { SubmitHandler } from "react-hook-form";

export interface ILogin {
  email: string;
  password: string;
}

export interface LoginFormProps {
  onSubmitLogin: SubmitHandler<ILogin>;
}
