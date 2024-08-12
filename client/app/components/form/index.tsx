import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ILogin, LoginFormProps } from "@/app/utils/interfaces/index";
import TextField from "@mui/material/TextField";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";

export const LoginForm: FC<LoginFormProps> = ({ onSubmitLogin }) => {
  const { handleSubmit, control } = useForm<ILogin>({ mode: "onChange" });
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <Controller
        control={control}
        rules={{ required: true }}
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
      <Controller
        control={control}
        rules={{ required: true }}
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
