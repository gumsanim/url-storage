import * as Material from "@material-tailwind/react";
import { Children } from "../../@types/global.types";
import { ListItemProps } from "./List.types";

export default function List({ children }: Children) {
  return <Material.List className={""}>{children}</Material.List>;
}

export function ListItem({
  children,
  name,
  ripple = false,

  clickHandler,
}: ListItemProps) {
  return (
    <Material.ListItem ripple={false} onClick={clickHandler}>
      {children}
    </Material.ListItem>
  );
}

export function ListItemIcon({ icon }: any) {
  return (
    <Material.ListItemSuffix>
      <Material.IconButton>{icon}</Material.IconButton>
    </Material.ListItemSuffix>
  );
}
