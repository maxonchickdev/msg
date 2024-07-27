import { FC } from "react";
import { ILink } from "../../../utils/interfaces/interfaces";
import { Link } from "@mui/material";

export const CustomLink: FC<ILink> = ({ content, href }) => {
    return <Link href={href}>{content}</Link>;
};
