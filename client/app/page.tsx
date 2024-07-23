"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "./components/forms/login.form";
import { ILogin } from "./utils/interfaces/interfaces";
import { SubmitHandler } from "react-hook-form";
import { LoginRegistrateService } from "./utils/services/services";
import { useForm } from "react-hook-form";
import { useState, SyntheticEvent } from "react";
import Stack from "@mui/material/Stack";
import { CustomSnackbar } from "./components/custom/snackbar/snackbar";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [open, setOpen] = useState(false);
    const { reset } = useForm<ILogin>();
    const onSubmitLogin: SubmitHandler<ILogin> = async (data) => {
        try {
            const { status } = await LoginRegistrateService.login(data);
            router.push("/profile");
            reset();
        } catch (err) {
            setError(err as string);
            setOpen(true);
        }
    };

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

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
            {error ? (
                <CustomSnackbar
                    handleClose={handleClose}
                    message={error}
                    open={open}
                />
            ) : null}
        </Stack>
    );
}
