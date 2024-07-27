import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ILogin, LoginFormProps } from "../../utils/interfaces/interfaces";
import { CustomLink } from "../custom/link/link";
import { CustomButton } from "../custom/button/button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
            <CustomButton
                content="Submit"
                endIcon={<KeyboardArrowUpIcon color="info" />}
            />
        </form>
    );
};
