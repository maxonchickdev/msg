"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { LoginRegistrateService } from "../utils/services/services";
import { RegistrationForm } from "../components/forms/registration.form";
import secureLocalStorage from "react-secure-storage";
import Stack from "@mui/material/Stack";
import { SyntheticEvent } from "react";
import { CustomSnackbar } from "../components/custom/snackbar/snackbar";
import { Box } from "@mui/material";
import { CustomLink } from "../components/custom/link/link";
import { IRegistrate } from "../utils/interfaces/interfaces";

export default function Registrate() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [regError, setRegError] = useState<string>("");
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
      router.push(
        (process.env.NEXT_PUBLIC_CLIENT_REG as string).concat(
          "/" + process.env.NEXT_PUBLIC_CLIENT_REG_CONFIRMATION,
        ),
      );
      reset();
    } catch (err) {
      setRegError(err as string);
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
        <h1 className="font-bold text-2xl text-center pb-2">
          Join to <span className="text-green-700">MESSANGER</span>
        </h1>
        <RegistrationForm onSubmitUserInfo={onSubmitUserInfo} />
        {regError ? (
          <CustomSnackbar
            handleClose={handleClose}
            message={regError}
            open={open}
          />
        ) : null}
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <p>Already have an account?</p>
          <CustomLink content="Log in." href="/" />
        </Box>
      </div>
    </Stack>
  );
}
