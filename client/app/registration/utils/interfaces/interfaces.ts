import { SubmitHandler } from "react-hook-form";

export interface IRegistrate {
  username: string;
  email: string;
  password: string;
}

export interface RegistrationFormProps {
  onSubmitUserInfo: SubmitHandler<IRegistrate>;
}
