'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { H1 } from '../components/headlines/h1/h1'
import { LogRegInput } from '../components/input/log.reg.input'
import { SubmitButton } from '../components/submit.button/submit.button'
import { ILogin } from '../interfaces/interfaces'
import { LoginRegistrateService } from '../services/services'

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<ILogin>
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    mode: 'onChange',
  })
  const handleFormSubmit: SubmitHandler<ILogin> = async data => {
    console.log(data)
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.login(data)
    if (res.statusCode === 200) cookies().set('access_token', res.message)
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <H1 content='Login' />
      <LogRegInput
        type='email'
        label='Email'
        placeholder='Enter email'
        name='email'
        register={register}
        errors={errors}
      />
      <LogRegInput
        type='password'
        label='Password'
        placeholder='Enter password'
        register={register}
        name='password'
        errors={errors}
      />
      <SubmitButton content='Submit' />
    </form>
  )
}
