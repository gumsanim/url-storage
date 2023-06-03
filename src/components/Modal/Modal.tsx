import { Children } from "../../@types/global.types";
import { MESSAGES } from "../../constants/messages";

export default function Modal({ children }: Children) {
  const modalRoot = document.getElementById("modal") as HTMLDivElement;

  if (!modalRoot) throw new Error(MESSAGES.NOT_FOUND);

  return <div className="">{children}</div>;
}
