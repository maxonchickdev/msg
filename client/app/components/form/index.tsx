import { Err } from "@/app/2fa/components/err";
import { ILogin, LoginFormProps } from "@/app/utils/interfaces/index";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";

export const LoginForm: FC<LoginFormProps> = ({ onSubmitLogin }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILogin>({ mode: "onChange" });
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <Controller
        control={control}
        rules={{ required: "Email is required" }}
        name="email"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label="Email"
            type="email"
            defaultValue={value}
            onChange={onChange}
            fullWidth
            size="small"
            sx={{ margin: "4px 0" }}
          />
        )}
      />
      {errors.email && <Err msg={errors.email.message!} />}
      <Controller
        control={control}
        rules={{
          required: "Password is required",
        }}
        name="password"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            defaultValue={value}
            onChange={onChange}
            fullWidth
            size="small"
            sx={{ margin: "4px 0" }}
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
