import Button from "@mui/material/Button";
import { FC, ReactNode } from "react";
import { IButton } from "../../../utils/interfaces/interfaces";

export const CustomButton: FC<IButton> = ({
    content,
    onClick,
    isDisabled,
    endIcon,
}) => {
    return (
        <Button
            disabled={isDisabled}
            type="submit"
            onClick={onClick}
            fullWidth
            endIcon={endIcon}
            variant="contained"
            className="my-1"
        >
            {content}
        </Button>
    );
};
