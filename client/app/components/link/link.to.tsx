import { Link } from '@nextui-org/react'
import { FC } from 'react'
import { ILinkTo } from '../../utils/interfaces/interfaces'

export const LinkTo: FC<ILinkTo> = ({ content, href }) => {
  return <Link href={href}>{content}</Link>
}
