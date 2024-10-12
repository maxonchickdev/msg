import { HTMLInputTypeAttribute } from 'react';
import { Control, RegisterOptions, SubmitHandler } from 'react-hook-form';

export interface IRegistrate {
  username: string;
  email: string;
  password: string;
}

export interface IRegistrationFormProps {
  onSubmitUserInfo: SubmitHandler<IRegistrate>;
}

export interface ISignupFormControllerProps {
  control: Control<IRegistrate>;
  required: string;
  name: 'email' | 'password' | 'username';
  label: string;
  type: HTMLInputTypeAttribute | undefined;
  rules?:
    | Omit<
        RegisterOptions<IRegistrate, 'password'>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
}

export interface ISignupSubmitButtonProps {
  content: string;
}
