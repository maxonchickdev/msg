"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { Services } from "./utils/services/index";
import { RegistrationForm } from "./components/form/index";
import secureLocalStorage from "react-secure-storage";
import Stack from "@mui/material/Stack";
import { SyntheticEvent } from "react";
import { Box } from "@mui/material";
import { IRegistrate } from "./utils/interfaces/index";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";

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
        (process.env.CLIENT_REG as string).concat(
          "/" + process.env.CLIENT_CONF,
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
