import { Children } from "../../@types/global.types";

export interface ListItemProps extends Children {
  name: string;
  ripple?: boolean;
  clickHandler: () => void;
}
