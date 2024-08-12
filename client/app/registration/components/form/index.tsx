import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  IRegistrate,
  RegistrationFormProps,
} from "@/app/registration/utils/interfaces/index";
import TextField from "@mui/material/TextField";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";

export const RegistrationForm: FC<RegistrationFormProps> = ({
  onSubmitUserInfo,
}) => {
  const { handleSubmit, control } = useForm<IRegistrate>({
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(onSubmitUserInfo)}>
      <Controller
        control={control}
        rules={{ required: true }}
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
            sx={{ margin: "4px 0" }}
            fullWidth
            size="small"
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
            sx={{ margin: "4px 0" }}
            fullWidth
            size="small"
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
