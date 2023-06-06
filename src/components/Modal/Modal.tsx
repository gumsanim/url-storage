import { Children } from '../../@types/global.types'
import { MESSAGES } from '../../constants/messages'

export default function Modal({ children }: Children) {
  const modalRoot = document.getElementById('modal') as HTMLDivElement

  if (!modalRoot) throw new Error(MESSAGES.NOT_FOUND)

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30"
      id="modal"
    >
      {children}
    </div>
  )
}
