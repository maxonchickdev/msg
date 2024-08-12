import { SubmitHandler } from "react-hook-form";

export interface IResendConfirmationCode {
  email: string;
}

export interface IConfirmation {
  email: string;
  code: string;
}

export interface IRegistrate {
  username: string;
  email: string;
  password: string;
}

export interface IConfirmationCode {
  code: string;
}

export interface IConfirmationFormProps {
  onSubmitCode: SubmitHandler<IConfirmationCode>;
}
