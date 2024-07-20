"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RegLogLayout } from "./utils/layouts/reg.log.layout/reg.log.layout";
import { LoginForm } from "./components/forms/login.form";
import { ILogin } from "./utils/interfaces/interfaces";
import { SubmitHandler } from "react-hook-form";
import { LoginRegistrateService } from "./services/services";
import { useForm } from "react-hook-form";
import { notify } from "./components/notify/notify";
import { INotify } from "./utils/interfaces/interfaces";

export default function Login() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const { reset } = useForm<ILogin>({
        mode: "onChange",
    });
    const onSubmitLogin: SubmitHandler<ILogin> = async (data) => {
        try {
            const { status } = await LoginRegistrateService.login(data);
            router.push("/profile");
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
                <LoginForm onSubmitLogin={onSubmitLogin} />
            </div>
        </RegLogLayout>
    );
}
