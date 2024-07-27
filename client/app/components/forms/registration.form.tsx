import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    IRegistrate,
    RegistrationFormProps,
} from "../../utils/interfaces/interfaces";
import { CustomButton } from "../custom/button/button";
import TextField from "@mui/material/TextField";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export const RegistrationForm: FC<RegistrationFormProps> = ({
    onSubmitUserInfo,
    isDisabled,
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
            <CustomButton
                isDisabled={isDisabled}
                content="Submit"
                endIcon={<KeyboardArrowUpIcon color="info" />}
            />
        </form>
    );
};
