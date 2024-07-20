import { Input } from "@nextui-org/input";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    IRegistrate,
    RegistrationFormProps,
} from "../../utils/interfaces/interfaces";
import { FlexWrapper } from "../flex.wrapper/flex.wrapper";
import { LinkTo } from "../link/link.to";
import { ButtonColors, SubmitButton } from "../submit.button/submit.button";

export const RegistrationForm: FC<RegistrationFormProps> = ({
    onSubmitUserInfo,
    isDisabled,
}) => {
    const { handleSubmit, control } = useForm<IRegistrate>({
        mode: "onChange",
    });
    return (
        <form onSubmit={handleSubmit(onSubmitUserInfo)}>
            <FlexWrapper>
                <h1 className="font-bold text-2xl">Registrate</h1>
                <LinkTo content="Login" href="/" />
            </FlexWrapper>
            <Controller
                control={control}
                rules={{ required: true }}
                name="username"
                render={({ field: { value, onChange } }) => (
                    <Input
                        type="text"
                        label="Username"
                        placeholder="Enter username"
                        defaultValue={value}
                        onChange={onChange}
                        className="my-2"
                    />
                )}
            />
            <Controller
                control={control}
                rules={{ required: true }}
                name="email"
                render={({ field: { value, onChange } }) => (
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter email"
                        defaultValue={value}
                        onChange={onChange}
                        className="my-2"
                    />
                )}
            />
            <Controller
                control={control}
                rules={{ required: true }}
                name="password"
                render={({ field: { value, onChange } }) => (
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter password"
                        defaultValue={value}
                        onChange={onChange}
                        className="my-2"
                    />
                )}
            />
            <SubmitButton
                isDisabled={isDisabled}
                content="Submit"
                color={ButtonColors.Primary}
            />
        </form>
    );
};