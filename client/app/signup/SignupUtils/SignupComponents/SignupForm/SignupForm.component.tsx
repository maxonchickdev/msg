import { Err } from '@/app/twofa/TwofaUtils/TwofaComponents/err'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { IRegistrate, RegistrationFormProps } from '../../SignupInterfaces/Signup.interfaces'

export const SignupForm: FC<RegistrationFormProps> = ({
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
      {errors.username && <Err msg={errors.username.message!} />}
      <Controller
        control={control}
        rules={{
          required: "Email is required",
        }}
        name="email"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            defaultValue={value}
            onChange={onChange}
            sx={{ margin: "4px 0" }}
            fullWidth
            size="small"
          />
        )}
      />
      {errors.email && <Err msg={errors.email.message!} />}
      <Controller
        control={control}
        rules={{
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
        }}
        name="password"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            defaultValue={value}
            onChange={onChange}
            sx={{ margin: "4px 0" }}
            fullWidth
            size="small"
          />
        )}
      />
      {errors.password && <Err msg={errors.password.message!} />}
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        endIcon={<KeyboardArrowUpIcon color="info" />}
      >
        Submit
      </Button>
    </form>
  );
};
