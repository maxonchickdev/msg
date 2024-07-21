import Button from "@mui/material/Button";
import { FC } from "react";
import { ILink } from "../../../utils/interfaces/interfaces";

export const CustomLink: FC<ILink> = ({ content, href }) => {
    return <Button href={href}>{content}</Button>;
};
