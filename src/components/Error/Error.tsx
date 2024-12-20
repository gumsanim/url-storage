import * as Material from '@material-tailwind/react'
import { ErrorProps } from './Error.types'
import useNavigator from '../../hooks/useNavigator'

export default function Error({
  message,
  buttonTxt,
  errorHandler,
}: ErrorProps) {
  const navigateHandler = useNavigator()
  return (
    <div className="text-center">
      <div className="mb-2 text-3xl font-bold">{message}</div>
      <Material.Button
        onClick={() => {
          errorHandler()
          navigateHandler('/url_list')
        }}
      >
        {buttonTxt}
      </Material.Button>
    </div>
  )
}
