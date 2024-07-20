"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IRegistrate } from "../utils/interfaces/interfaces";
import { SubmitHandler } from "react-hook-form";
import { LoginRegistrateService } from "../services/services";
import { INotify } from "../utils/interfaces/interfaces";
import { IVerificationCode } from "../utils/interfaces/interfaces";
import { notify } from "../components/notify/notify";
import { RegistrationForm } from "../components/forms/registration.form";
import { ValidateCodeForm } from "../components/forms/validate.code.form";
import { RegLogLayout } from "../utils/layouts/reg.log.layout/reg.log.layout";
import secureLocalStorage from "react-secure-storage";

export default function Registrate() {
    const [isSent, setIsSent] = useState<boolean>(false);
    const [isDisabledDetails, setIsDisabledDetails] = useState<boolean>(false);
    const [isDisabledCode, setIsDisabledCode] = useState<boolean>(false);
    const router = useRouter();
    const { reset } = useForm<IRegistrate>({ mode: "onChange" });

    const onSubmitUserInfo: SubmitHandler<IRegistrate> = async (data) => {
        try {
            const { status } = await LoginRegistrateService.registrate(data);
            secureLocalStorage.setItem("email", data.email);
            setIsDisabledDetails(true);
            setIsSent(true);
            reset();
        } catch (err) {
            const notifyData: INotify = {
                message: err as string,
            };
            notify(notifyData);
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
            const notifyData: INotify = {
                message: err as string,
            };
            notify(notifyData);
        }
    };

    return (
        <RegLogLayout>
            <div className="max-w-[700px] w-full">
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
            </div>
        </RegLogLayout>
    );
}
