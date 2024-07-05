import { Input } from '@nextui-org/input'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IRegistrate } from '../../interfaces/interfaces'
import style from './log.reg.input.module.css'

export const RegInput = ({
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
  name: keyof IRegistrate
  register: UseFormRegister<IRegistrate>
  errors: FieldErrors<IRegistrate>
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
