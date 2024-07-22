"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "./components/forms/login.form";
import { ILogin } from "./utils/interfaces/interfaces";
import { SubmitHandler } from "react-hook-form";
import { LoginRegistrateService } from "./utils/services/services";
import { useForm } from "react-hook-form";
import { CustomError } from "@/app/components/custom/error/error";
import { useState } from "react";
import Stack from "@mui/material/Stack";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const { reset } = useForm<ILogin>({
        mode: "onChange",
    });
    const onSubmitLogin: SubmitHandler<ILogin> = async (data) => {
        try {
            await LoginRegistrateService.login(data);
            router.push("/profile");
            reset();
        } catch (err) {
            setError(err as string);
        }
    };

    if (error) return <CustomError href="/" content={error} />;
    return (
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ width: 1, height: "100vh" }}
        >
            <div className="max-w-[700px] w-full">
                <LoginForm onSubmitLogin={onSubmitLogin} />
            </div>
        </Stack>
    );
}
