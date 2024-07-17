'use client'

import { Input } from '@nextui-org/input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { INotify, IRegistrate } from '../../interfaces/interfaces'
import { LoginRegistrateService } from '../../services/services'
import { FlexWrapper } from '../flex.wrapper/flex.wrapper'
import { H1 } from '../headlines/h1/h1'
import { LinkTo } from '../link/link.to'
import { notify } from '../notify/notify'
import { SubmitButton } from '../submit.button/submit.button'

export const RegistrationForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IRegistrate>({
    mode: 'onChange'
  })
  const onSubmitUserInfo: SubmitHandler<IRegistrate> = async data => {
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.registrate(data)
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: res.statusCode === 200 ? '✅' : '🚫'
    }
    localStorage.setItem('username', 'max')
    if (res.statusCode === 200) {
      console.log('ping')
      notify(notifyData)
      // router.push('/')
      reset()
    } else {
      notify(notifyData)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitUserInfo)}>
      <FlexWrapper>
        <H1 content='Registrate' />
        <LinkTo content='Login' href='/' />
      </FlexWrapper>
      <Controller
        control={control}
        rules={{ required: true }}
        name='username'
        render={({ field: { value, onChange } }) => (
          <Input
            type='text'
            label='Username'
            placeholder='Enter username'
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name='email'
        render={({ field: { value, onChange } }) => (
          <Input
            type='email'
            label='Email'
            placeholder='Enter email'
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
      <Controller
        control={control}
        rules={{ required: true }}
        name='password'
        render={({ field: { value, onChange } }) => (
          <Input
            type='password'
            label='Password'
            placeholder='Enter password'
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
      <SubmitButton content='Submit' />
    </form>
  )
}
