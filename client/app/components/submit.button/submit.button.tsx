import { Button } from "@nextui-org/button";

export enum ButtonColors {
    Success = "success",
    Default = "default",
    Primary = "primary",
    Secondary = "secondary",
    Warning = "warning",
    Danger = "danger",
}

export const SubmitButton = ({
    content,
    color = ButtonColors.Success,
    onClick,
    isDisabled,
}: {
    content: string;
    color?: ButtonColors;
    onClick?: () => void;
    isDisabled?: boolean;
}) => {
    return (
        <Button
            isDisabled={isDisabled}
            type="submit"
            color={color}
            onClick={onClick}
            fullWidth
        >
            {content}
        </Button>
    );
};
