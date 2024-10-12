'use client';

import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Divider } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SigninForm } from './SigninUtils/SigninComponents/SigninForm/SigninForm.component';
import { ILogin } from './SigninUtils/SigninInterfaces/Signin.interfaces';
import { SigninServices } from './SigninUtils/SigninServices/Signin.services';

export default function Page() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { reset } = useForm<ILogin>();
  const onSubmitLogin: SubmitHandler<ILogin> = async (data) => {
    try {
      const { status } = await SigninServices.login(data);
      router.push(process.env.CLIENT_SIGNIN_TWOFA as string);
      reset();
    } catch (err) {
      setError(err as string);
      setOpen(true);
    }
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: '100vh' }}
    >
      <div className="max-w-[700px] w-full">
        <h1 className="font-bold text-2xl text-center pb-4">
          Login to <span className="text-green-700">MSG</span>
        </h1>
        <Button
          type="submit"
          onClick={() => {
            router.push(
              ((('http://' + process.env.SERVER_HOST) as string) +
                ':' +
                process.env.SERVER_PORT +
                process.env.SERVER_SIGNIN_GOOGLE) as string
            );
          }}
          fullWidth
          endIcon={<GoogleIcon color="success" />}
          variant="outlined"
          sx={{ margin: '4px 0', color: '#000' }}
        >
          Login with google
        </Button>
        <Button
          type="submit"
          onClick={() => {
            router.push(
              ((('http://' + process.env.SERVER_HOST) as string) +
                ':' +
                process.env.SERVER_PORT +
                process.env.SERVER_SIGNIN_GITHUB) as string
            );
          }}
          fullWidth
          endIcon={<GitHubIcon color="success" />}
          variant="outlined"
          sx={{ margin: '4px 0', color: '#000' }}
        >
          Login with github
        </Button>
        <Divider sx={{ padding: '10px 0' }}>Or</Divider>
        <SigninForm onSubmitLogin={onSubmitLogin} />
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <p>
            New to <span className="text-green-700">MSG</span>?
          </p>
          <Link href={process.env.CLIENT_SIGNUP}>Create account</Link>
        </Box>
      </div>
      {error ? (
        <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      ) : null}
    </Stack>
  );
}
