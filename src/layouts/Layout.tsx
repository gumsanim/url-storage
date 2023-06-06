import { Children } from '../@types/global.types'

export default function Layout({ children }: Children) {
  return (
    <div
      className={`mx-auto flex h-screen max-w-7xl items-center justify-center`}
    >
      {children}
    </div>
  )
}
