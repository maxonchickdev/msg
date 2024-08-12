"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { ValidateCodeForm } from "@/app/components/forms/validate.code.form";
import secureLocalStorage from "react-secure-storage";
import Stack from "@mui/material/Stack";
import { SyntheticEvent } from "react";
import { Box } from "@mui/material";
import { Services } from "./utils/services/services";
import { IVerificationCode, IRegistrate } from "./utils/interfaces/interfaces";
import { CustomLink } from "@/app/components/custom/link/link";
import { CustomSnackbar } from "@/app/components/custom/snackbar/snackbar";
import { CustomButton } from "@/app/components/custom/button/button";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Registrate() {
  const router = useRouter();
  const { reset } = useForm<IRegistrate>({ mode: "onChange" });
  const [confirmationError, setConfirmationError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const onSubmitConfirmationCode: SubmitHandler<IVerificationCode> = async (
    data,
  ) => {
    try {
      const email = secureLocalStorage.getItem("email");
      if (!email) return;
      const { status } = await Services.confirm({
        email: email as string,
        code: data.code,
      });
      router.push("/");
      reset();
    } catch (err) {
      setConfirmationError(err as string);
      setOpen(true);
    }
  };
  const resendCode = async () => {
    try {
      const email = secureLocalStorage.getItem("email");
      if (!email) return;
      const { status } = await Services.resendConfirmationCode({
        email: email as string,
      });
      console.log("err");
    } catch (err) {
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
          Enter confirmation code
        </h1>
        <ValidateCodeForm onSubmitCode={onSubmitConfirmationCode} />
        {confirmationError ? (
          <CustomSnackbar
            handleClose={handleClose}
            message={confirmationError}
            open={open}
          />
        ) : null}
        <CustomButton
          content="Resend confirmation code"
          endIcon={<KeyboardArrowUpIcon color="info" />}
          onClick={resendCode}
        />
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
