import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { ILogin, LoginFormProps } from "../../utils/interfaces/interfaces";
import { FlexWrapper } from "../flex.wrapper/flex.wrapper";
import { CustomLink } from "../custom/link/link";
import { CustomButton } from "../custom/button/button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

export const LoginForm: FC<LoginFormProps> = ({ onSubmitLogin }) => {
    const { handleSubmit, control } = useForm<ILogin>({ mode: "onChange" });
    return (
        <form onSubmit={handleSubmit(onSubmitLogin)}>
            <FlexWrapper>
                <h1 className="font-bold text-2xl">Login</h1>
                <CustomLink content="Registrate" href="/registrate" />
            </FlexWrapper>
            <Controller
                control={control}
                rules={{ required: true }}
                name="email"
                render={({ field: { value, onChange } }) => (
                    <TextField
                        id="outlined-password-input"
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        defaultValue={value}
                        onChange={onChange}
                        className="my-1"
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
                        placeholder="Enter password"
                        defaultValue={value}
                        onChange={onChange}
                        className="my-1"
                        fullWidth
                        size="small"
                    />
                )}
            />
            <CustomButton content="Submit" endIcon={<SendIcon />} />
        </form>
    );
};
