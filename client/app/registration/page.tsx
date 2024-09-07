"use client";

import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import secureLocalStorage from "react-secure-storage";
import { RegistrationForm } from "./components/form/signup.form";
import { IRegistrate } from "./utils/interfaces/signup.interfaces";
import { Services } from "./utils/services/signup.services";

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
      const { status } = await Services.registrate(data);
      secureLocalStorage.setItem("email", data.email);
      router.push(
        (process.env.CLIENT_REG as string).concat("/" + process.env.CLIENT_CONF)
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
          <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {regError}
            </Alert>
          </Snackbar>
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
          <Link href="/">Log in</Link>
        </Box>
      </div>
    </Stack>
  );
}
