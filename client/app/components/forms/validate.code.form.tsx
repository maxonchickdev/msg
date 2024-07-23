import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    IVerificationCode,
    ValidationFormProps,
} from "../../utils/interfaces/interfaces";
import { CustomButton } from "../custom/button/button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

export const ValidateCodeForm: FC<ValidationFormProps> = ({
    onSubmitCode,
    isDisabled,
}) => {
    const { handleSubmit, control } = useForm<IVerificationCode>({
        mode: "onChange",
    });
    return (
        <form onSubmit={handleSubmit(onSubmitCode)} className="mt-5">
            <Controller
                control={control}
                rules={{ required: true }}
                name="code"
                render={({ field: { value, onChange } }) => (
                    <TextField
                        id="outlined-password-input"
                        label="Validation code"
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
                isDisabled={isDisabled}
                content="Submit"
                endIcon={<SendIcon />}
            />
        </form>
    );
};
