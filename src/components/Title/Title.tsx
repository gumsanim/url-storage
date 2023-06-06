import { Children } from '../../@types/global.types';

export default function Title({ children }: Children) {
  return <p className="text-center mb-20 font-bold text-2xl md:text-lg md:px-2">{children}</p>;
}
