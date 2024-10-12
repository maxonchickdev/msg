import { FC } from "react"
import { IErr } from "../TwofaInterfaces/Twofa.interfaces"

export const Err: FC<IErr> = ({ msg }) => {
  return <p className="text-red-700 my-[5px] text-sm">{msg}</p>;
};
