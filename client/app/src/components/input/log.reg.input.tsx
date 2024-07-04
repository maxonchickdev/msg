import { Input } from '@nextui-org/input'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ILogin } from '../../interfaces/interfaces'
import style from './log.reg.input.module.css'

export const LogRegInput = ({
  type,
  label,
  placeholder,
  name,
  register,
  errors,
}: {
  type: string
  label: string
  placeholder: string
  name: keyof ILogin
  register: UseFormRegister<ILogin>
  errors: FieldErrors<ILogin>
}) => {
  return (
    <>
      <Input
        type={type}
        label={label}
        placeholder={placeholder}
        className={style.input}
        {...register(name, { required: true })}
      />
    </>
  )
}
