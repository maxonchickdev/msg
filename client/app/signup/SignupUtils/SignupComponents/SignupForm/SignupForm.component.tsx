import { Err } from '@/app/twofa/TwofaUtils/TwofaComponents/err'
import { FC } from "react"
import { useForm } from "react-hook-form"
import { IRegistrate, IRegistrationFormProps } from '../../SignupInterfaces/Signup.interfaces'
import { SignupFormController } from '../SignupFormController/SignupFormController.component'
import { SignupFormSubmitButton } from '../SignupFormSubmitButton/SIgnupFormSubmitButton.component'

export const SignupForm: FC<IRegistrationFormProps> = ({
  onSubmitUserInfo,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegistrate>({
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(onSubmitUserInfo)}>
      <SignupFormController control={control} required='Username is required' name='username' label='Username' type='text' />
      {errors.username && <Err msg={errors.username.message!} />}
      <SignupFormController control={control} required='Email is required' name='email' label='Email' type='email' />
      {errors.email && <Err msg={errors.email.message!} />}
      <SignupFormController control={control} required='Password is required' name='password' label='Password' type='password' rules={{
          required: "Password is required",
          validate: {
            noWhitespace: (value) =>
              /^\S*$/.test(value) || "Password must not contain whitespaces",
            hasUppercase: (value) =>
              /^(?=.*[A-Z]).*$/.test(value) ||
              "Password must have at least one uppercase character",
            hasLowercase: (value) =>
              /^(?=.*[a-z]).*$/.test(value) ||
              "Password must have at least one lowercase character",
            hasNumber: (value) =>
              /^(?=.*[0-9]).*$/.test(value) ||
              "Password must contain at least one digit",
            hasSymbol: (value) =>
              /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(value) ||
              "Password must contain at least one special symbol",
            hasValidLength: (value) =>
              /^.{8,16}$/.test(value) ||
              "Password must be 8-16 characters long",
          },
        }} />
      {errors.password && <Err msg={errors.password.message!} />}
      <SignupFormSubmitButton content='Submit' />
    </form>
  );
};
