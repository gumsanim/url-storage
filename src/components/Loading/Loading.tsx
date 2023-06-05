import { LoadingProps } from "./Loading.types";

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return <div>{message}</div>;
}
