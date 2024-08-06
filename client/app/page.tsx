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
import GoogleIcon from "@mui/icons-material/Google";
import { CustomButton } from "./components/custom/button/button";
import { Divider } from "@mui/material";
import { CustomLink } from "./components/custom/link/link";
import Box from "@mui/material/Box";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { reset } = useForm<ILogin>();
  const onSubmitLogin: SubmitHandler<ILogin> = async (data) => {
    try {
      const { status } = await LoginRegistrateService.login(data);
      router.push(process.env.CLIENT_PROFILE as string);
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
        <h1 className="font-bold text-2xl text-center pb-4">
          Login to <span className="text-green-700">MESSANGER</span>
        </h1>
        <CustomButton
          content="Continue with Google"
          endIcon={<GoogleIcon color="info" />}
          onClick={() =>
            router.push(
              (process.env.SERVER_ORIGIN as string).concat(
                process.env.SERVER_GOOGLE_AUTH as string,
              ),
            )
          }
        />
        <Divider sx={{ padding: "10px 0" }}>Or</Divider>
        <LoginForm onSubmitLogin={onSubmitLogin} />
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
          <p className="">
            New to <span className="text-green-700">MESSANGER</span>?
          </p>
          <CustomLink
            content="Create account."
            href={process.env.CLIENT_REG as string}
          />
        </Box>
      </div>
      {error ? (
        <CustomSnackbar handleClose={handleClose} message={error} open={open} />
      ) : null}
    </Stack>
  );
}
