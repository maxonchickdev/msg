"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { ConfirmationCodeForm } from "./components/form/index";
import Button from "@mui/material/Button";
import secureLocalStorage from "react-secure-storage";
import Stack from "@mui/material/Stack";
import { SyntheticEvent } from "react";
import { Box } from "@mui/material";
import { Services } from "./utils/services/index";
import { IConfirmationCode, IRegistrate } from "./utils/interfaces/index";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Registrate() {
  const router = useRouter();
  const { reset } = useForm<IConfirmationCode>({ mode: "onChange" });
  const [confirmationError, setConfirmationError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const onSubmitConfirmationCode: SubmitHandler<IConfirmationCode> = async (
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
        <ConfirmationCodeForm onSubmitCode={onSubmitConfirmationCode} />
        {confirmationError ? (
          <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {confirmationError}
            </Alert>
          </Snackbar>
        ) : null}
        <Button
          type="submit"
          onClick={resendCode}
          fullWidth
          endIcon={<KeyboardArrowUpIcon color="info" />}
          variant="outlined"
          sx={{ margin: "4px 0" }}
        >
          Resend confirmation code
        </Button>
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
          <Link href="/">Log in</Link>;
        </Box>
      </div>
    </Stack>
  );
}
