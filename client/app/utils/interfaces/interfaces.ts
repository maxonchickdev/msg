import { ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

export interface IRegistrate {
    username: string;
    email: string;
    password: string;
}

export interface ILogin extends Omit<IRegistrate, "username"> {}

export interface IProfile {
    username: string;
    email: string;
    createdAt: Date;
}

export interface INotify {
    message: string;
}

export interface IVerificationCode {
    code: string;
}

export interface RegistrationFormProps {
    onSubmitUserInfo: SubmitHandler<IRegistrate>;
    isDisabled: boolean;
}

export interface ValidationFormProps {
    onSubmitCode: SubmitHandler<IVerificationCode>;
    isDisabled: boolean;
}

export interface LoginFormProps {
    onSubmitLogin: SubmitHandler<ILogin>;
}

export interface ILink {
    content: string;
    href: string;
}

export interface IError {
    message: string;
}

export interface IButton {
    content: string;
    onClick?: () => void;
    isDisabled?: boolean;
    endIcon: ReactNode;
}
