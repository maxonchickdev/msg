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
import Stack from "@mui/material/Stack";
import { SyntheticEvent } from "react";
import { CustomSnackbar } from "../components/custom/snackbar/snackbar";

export default function Registrate() {
    const [open, setOpen] = useState<boolean>(false);
    const [isSent, setIsSent] = useState<boolean>(false);
    const [isDisabledDetails, setIsDisabledDetails] = useState<boolean>(false);
    const [isDisabledCode, setIsDisabledCode] = useState<boolean>(false);
    const [regError, setRegError] = useState<string>("");
    const [validateError, setValidateError] = useState<string>("");
    const router = useRouter();
    const { reset } = useForm<IRegistrate>({ mode: "onChange" });

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const onSubmitUserInfo: SubmitHandler<IRegistrate> = async (data) => {
        try {
            const { status } = await LoginRegistrateService.registrate(data);
            secureLocalStorage.setItem("email", data.email);
            setIsDisabledDetails(true);
            setIsSent(true);
            reset();
        } catch (err) {
            setRegError(err as string);
            setOpen(true);
        }
    };
    const onSubmitCode: SubmitHandler<IVerificationCode> = async (data) => {
        try {
            const email = secureLocalStorage.getItem("email");
            const { status } = await LoginRegistrateService.validate(
                email as string,
                data.code,
            );
            setIsDisabledCode(true);
            router.push("/");
            reset();
        } catch (err) {
            setValidateError(err as string);
            setOpen(true);
        }
    };

    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "100vh" }}
        >
            <div className="max-w-[700px] w-full">
                <RegistrationForm
                    isDisabled={isDisabledDetails}
                    onSubmitUserInfo={onSubmitUserInfo}
                />
                {regError ? (
                    <CustomSnackbar
                        handleClose={handleClose}
                        message={regError}
                        open={open}
                    />
                ) : null}
                {isSent ? (
                    <>
                        <ValidateCodeForm
                            isDisabled={isDisabledCode}
                            onSubmitCode={onSubmitCode}
                        />
                    </>
                ) : null}
                {validateError ? (
                    <CustomSnackbar
                        handleClose={handleClose}
                        message={validateError}
                        open={open}
                    />
                ) : null}
            </div>
        </Stack>
    );
}
