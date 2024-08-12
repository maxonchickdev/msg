import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  IConfirmationCode,
  IConfirmationFormProps,
} from "../../utils/interfaces";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const ConfirmationCodeForm: FC<IConfirmationFormProps> = ({
  onSubmitCode,
}) => {
  const { handleSubmit, control } = useForm<IConfirmationCode>({
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
      <Button
        fullWidth
        variant="outlined"
        type="submit"
        endIcon={<KeyboardArrowUpIcon color="info" />}
      >
        Submit
      </Button>
    </form>
  );
};
