import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Err } from '../../../twofa/TwofaUtils/TwofaComponents/err';
import {
  ILogin,
  ILoginFormProps,
} from '../../SigninInterfaces/Signin.interfaces';
import { SigninFormController } from '../SigninFormController/SigninFormController.component';
import { SigninSubmitButton } from '../SigninSubmitButton/SigninSubmitButton.component';

export const SigninForm: FC<ILoginFormProps> = ({ onSubmitLogin }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILogin>({ mode: 'onChange' });
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <SigninFormController
        control={control}
        required="Email is required"
        label="Email"
        type="email"
      />
      {errors.email && <Err msg={errors.email?.message as string} />}
      <SigninFormController
        control={control}
        required="Password is required"
        label="Password"
        type="password"
        rules={{
          required: 'Password is required',
        }}
      />
      {errors.password && <Err msg={errors.password?.message as string} />}
      <SigninSubmitButton content="Submit" />
    </form>
  );
};
