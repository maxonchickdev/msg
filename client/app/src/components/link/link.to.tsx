import { Link } from '@nextui-org/react'

export const LinkTo = ({
  content,
  href,
}: {
  content: string
  href: string
}) => {
  return <Link href={href}>{content}</Link>
}
