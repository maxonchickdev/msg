import { IError } from "@/app/utils/interfaces/interfaces";
import { FC } from "react";
import { CustomLink } from "../link/link";

export const CustomError: FC<IError> = ({ content, href }) => {
    return (
        <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center">
            <p className="text-4xl font-bold">{content}</p>
            <CustomLink href={href!} content="Come back" />
        </div>
    );
};
