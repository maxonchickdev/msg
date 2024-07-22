"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IRegistrate } from "../utils/interfaces/interfaces";
import { SubmitHandler } from "react-hook-form";
import { LoginRegistrateService } from "../utils/services/services";
import { IVerificationCode } from "../utils/interfaces/interfaces";
import { RegistrationForm } from "../components/forms/registration.form";
import { ValidateCodeForm } from "../components/forms/validate.code.form";
import secureLocalStorage from "react-secure-storage";
import { CustomError } from "@/app/components/custom/error/error";
import Stack from "@mui/material/Stack";

export default function Registrate() {
    const [isSent, setIsSent] = useState<boolean>(false);
    const [isDisabledDetails, setIsDisabledDetails] = useState<boolean>(false);
    const [isDisabledCode, setIsDisabledCode] = useState<boolean>(false);
    const [regError, setRegError] = useState<string>("");
    const [validateError, setValidateError] = useState<string>("");
    const router = useRouter();
    const { reset } = useForm<IRegistrate>({ mode: "onChange" });

    const onSubmitUserInfo: SubmitHandler<IRegistrate> = async (data) => {
        try {
            await LoginRegistrateService.registrate(data);
            secureLocalStorage.setItem("email", data.email);
            setIsDisabledDetails(true);
            setIsSent(true);
            reset();
        } catch (err) {
            setRegError(err as string);
        }
    };
    const onSubmitCode: SubmitHandler<IVerificationCode> = async (data) => {
        try {
            const email = secureLocalStorage.getItem("email");
            await LoginRegistrateService.validate(email as string, data.code);
            setIsDisabledCode(true);
            router.push("/");
            reset();
        } catch (err) {
            setValidateError(err as string);
        }
    };

    if (regError) return <CustomError href="/registrate" content={regError} />;
    if (validateError)
        return <CustomError href="/registrate" content={validateError} />;

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "100vh" }}
        >
            <RegistrationForm
                isDisabled={isDisabledDetails}
                onSubmitUserInfo={onSubmitUserInfo}
            />
            {isSent ? (
                <>
                    <ValidateCodeForm
                        isDisabled={isDisabledCode}
                        onSubmitCode={onSubmitCode}
                    />
                </>
            ) : null}
        </Stack>
    );
}
