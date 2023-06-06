import { Children } from '../../@types/global.types'

export default function Title({ children }: Children) {
  return (
    <p className="mb-20 text-center text-2xl font-bold md:px-2 md:text-lg">
      {children}
    </p>
  )
}
