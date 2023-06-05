import * as Material from "@material-tailwind/react";
import { Children } from "../../@types/global.types";
import { ListItemIconProps, ListItemProps } from "./List.types";
import { ClassNames } from "../../@types/style.types";

const listItemClassNames: ClassNames = {
  url_list: "py-1 pr-1 pl-4",
};

function List({ children }: Children) {
  return <Material.List>{children}</Material.List>;
}

export function ListItem({
  children,
  className,
  ripple = false,
  clickHandler,
}: ListItemProps) {
  return (
    <Material.ListItem
      className={listItemClassNames[className]}
      ripple={ripple}
      onClick={clickHandler}
    >
      {children}
    </Material.ListItem>
  );
}

export function ListItemIcon({ children, clickHandler }: ListItemIconProps) {
  return (
    <Material.ListItemSuffix onClick={clickHandler}>
      <Material.IconButton variant="text" color="blue-gray">
        {children}
      </Material.IconButton>
    </Material.ListItemSuffix>
  );
}

List.Item = ListItem;
ListItem.Icon = ListItemIcon;

export default List;
