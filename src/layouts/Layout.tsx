import { Children } from '../@types/global.types';

export default function Layout({ children }: Children) {
  return (
    <div className={`flex justify-center items-center mx-auto max-w-7xl h-screen`}>{children}</div>
  );
}
