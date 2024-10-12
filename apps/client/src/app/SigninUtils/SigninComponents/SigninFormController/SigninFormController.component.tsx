import { TextField } from '@mui/material'
import { FC } from 'react'
import { Controller } from 'react-hook-form'
import { ISigninFormControllerProps } from '../../SigninInterfaces/Signin.interfaces'

export const SigninFormController: FC<ISigninFormControllerProps> = ({control, required, label, type}) => {
	return (
		<Controller
        control={control}
        rules={{ required: required }}
        name="email"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label={label}
            type={type}
            defaultValue={value}
            onChange={onChange}
            fullWidth
            size="small"
            sx={{ margin: "4px 0" }}
          />
        )}
      />
	)
}
