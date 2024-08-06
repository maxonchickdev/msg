import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  IVerificationCode,
  ValidationFormProps,
} from "../../utils/interfaces/interfaces";
import { CustomButton } from "../custom/button/button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TextField from "@mui/material/TextField";

export const ValidateCodeForm: FC<ValidationFormProps> = ({ onSubmitCode }) => {
  const { handleSubmit, control } = useForm<IVerificationCode>({
    mode: "onChange",
  });
  return (
    <form onSubmit={handleSubmit(onSubmitCode)}>
      <Controller
        control={control}
        rules={{ required: true }}
        name="code"
        render={({ field: { value, onChange } }) => (
          <TextField
            id="outlined-password-input"
            label="Code"
            type="text"
            defaultValue={value}
            onChange={onChange}
            sx={{ margin: "4px 0" }}
            fullWidth
            size="small"
          />
        )}
      />
      <CustomButton
        content="Submit"
        endIcon={<KeyboardArrowUpIcon color="info" />}
      />
    </form>
  );
};
