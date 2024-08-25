"use client";

import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginForm } from "./components/form/index";
import { ILogin } from "./utils/interfaces/index";
import { Services } from "./utils/services/index";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { reset } = useForm<ILogin>();
  const onSubmitLogin: SubmitHandler<ILogin> = async (data) => {
    try {
      const { status } = await Services.login(data);
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
        <Button
          type="submit"
          onClick={() => {
            router.push(
              (process.env.SERVER_ORIGIN as string).concat(
                process.env.SERVER_GOOGLE_AUTH as string
              )
            );
          }}
          fullWidth
          endIcon={<GoogleIcon color="success" />}
          variant="outlined"
          sx={{ margin: "4px 0", color: "#000" }}
        >
          Login with google
        </Button>
        <Button
          type="submit"
          onClick={() => {
            router.push(
              (process.env.SERVER_ORIGIN as string).concat(
                process.env.SERVER_GOOGLE_AUTH as string
              )
            );
          }}
          fullWidth
          endIcon={<GitHubIcon color="success" />}
          variant="outlined"
          sx={{ margin: "4px 0", color: "#000" }}
        >
          Login with github
        </Button>
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
          <p>
            New to <span className="text-green-700">MESSANGER</span>?
          </p>
          <Link href={process.env.CLIENT_REG}>Create account</Link>
        </Box>
      </div>
      {error ? (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      ) : null}
    </Stack>
  );
}
