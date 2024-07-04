import { Button } from '@nextui-org/button'

export enum ButtonColor {
  Success = 'success',
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Warning = 'warning',
  Danger = 'danger',
}

export const SubmitButton = ({
  content,
  color = ButtonColor.Success,
}: {
  content: string
  color?: ButtonColor
}) => {
  return (
    <Button type='submit' color={color}>
      {content}
    </Button>
  )
}
