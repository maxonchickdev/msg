"use client";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { MuiOtpInput } from "mui-one-time-password-input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Err } from "./components/err";
import { TwofaCode } from "./utils/interfaces";
import { Services } from "./utils/services";

export default function Twofa() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TwofaCode>({
    mode: "onChange",
  });
  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const getQR = async () => {
    try {
      const data = await Services.qr();
      setQrCodeDataUrl(data);
    } catch (err) {
      setError(err as string);
      setOpen(true);
    }
  };
  useEffect(() => {
    getQR();
  }, []);
  const onSubmitUserInfo: SubmitHandler<TwofaCode> = async (data) => {
    try {
      const res = await Services.turnOnTwofa(data);
      router.push(process.env.CLIENT_PROFILE as string);
    } catch (err) {
      setError(err as string);
      setOpen(true);
    }
  };
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: 1,
        height: "100vh",
      }}
    >
      <div className="max-w-[700px] w-full">
        <h1 className="font-bold text-2xl text-center pb-2">
          2FA authentication to{" "}
          <span className="text-green-700">MESSANGER</span>
        </h1>
        {qrCodeDataUrl ? (
          <div className="flex justify-center">
            <Image src={qrCodeDataUrl} width={400} height={400} alt="qr-code" />
          </div>
        ) : (
          <>Loading...</>
        )}
        <form onSubmit={handleSubmit(onSubmitUserInfo)}>
          <Controller
            control={control}
            rules={{
              required: "Code is required",
              validate: (value) =>
                value.length === 6 || "Code must be 6 digits",
            }}
            name="code"
            render={({ field: { value, onChange } }) => (
              <MuiOtpInput
                onChange={onChange}
                value={value}
                length={6}
                sx={{ margin: "10px 0" }}
                TextFieldsProps={(index) => ({
                  size: "small",
                  placeholder: String(index),
                })}
              />
            )}
          />
          {errors.code && <Err msg={errors.code.message!}></Err>}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            endIcon={<KeyboardArrowUpIcon color="info" />}
          >
            Submit
          </Button>
        </form>
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
      </div>
    </Stack>
  );
}
