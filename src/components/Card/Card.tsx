import * as Material from "@material-tailwind/react";
import { CardProps } from "./Card.types";
import { ClassNames } from "../../@types/style.types";

const cardClassNames: ClassNames = {
  url_list: "h-[18rem] md:w-screen",
  modal: "border border-black",
};

export default function Card({ className, children }: CardProps) {
  return (
    <Material.Card className={cardClassNames[className]}>
      {children}
    </Material.Card>
  );
}
