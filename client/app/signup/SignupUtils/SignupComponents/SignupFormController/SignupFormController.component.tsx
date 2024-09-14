import { FC } from 'react'

export const SignupFormController: FC<> = () => {
	return (
<Controller
        control={control}
        rules={{
          required: "Username is required",
        }}
        name="username"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label="Username"
            type="text"
            defaultValue={value}
            onChange={onChange}
            sx={{ margin: "4px 0" }}
            fullWidth
            size="small"
          />
        )}
      />
	)
}