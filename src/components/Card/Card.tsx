import * as Material from '@material-tailwind/react'
import { CardProps } from './Card.types'
import { ClassNames } from '../../@types/style.types'

const cardClassNames: ClassNames = {
  url_list: 'h-[15rem] md:w-screen',
  modal:
    'w-96 h-48 flex justify-center items-center md:calc(w-screen - 2) md:h-48',
  url_detail: 'w-min md:w-screen',
}

export default function Card({ className, children }: CardProps) {
  return (
    <Material.Card className={cardClassNames[className]}>
      {children}
    </Material.Card>
  )
}
