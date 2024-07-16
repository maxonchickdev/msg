import { Button } from '@nextui-org/button'

export enum ButtonColor {
  Success = 'success',
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Warning = 'warning',
  Danger = 'danger'
}

export const SubmitButton = ({
  content,
  color = ButtonColor.Success,
  onClick
}: {
  content: string
  color?: ButtonColor
  onClick?: () => void
}) => {
  return (
    <Button type='submit' color={color} onClick={onClick} fullWidth>
      {content}
    </Button>
  )
}
