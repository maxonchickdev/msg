import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ISignupFormControllerProps } from '../../SignupInterfaces/Signup.interfaces';

export const SignupFormController: FC<ISignupFormControllerProps> = ({
  control,
  required,
  name,
  label,
  type,
}) => {
  return (
    <Controller
      control={control}
      rules={{
        required: required,
      }}
      name={name}
      render={({ field: { value, onChange } }) => (
        <TextField
          id="outlined-password-input"
          label={label}
          type={type}
          defaultValue={value}
          onChange={onChange}
          sx={{ margin: '4px 0' }}
          fullWidth
          size="small"
        />
      )}
    />
  );
};
