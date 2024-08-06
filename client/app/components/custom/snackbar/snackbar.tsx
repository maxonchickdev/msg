import { ISnackbar } from "@/app/utils/interfaces/interfaces";
import { FC } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const CustomSnackbar: FC<ISnackbar> = ({
  handleClose,
  message,
  open,
}) => {
  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={3000}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
