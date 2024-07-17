'use client'

import { Input } from '@nextui-org/input'
import { FC } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IRegistrate } from '../../interfaces/interfaces'
import { FlexWrapper } from '../flex.wrapper/flex.wrapper'
import { H1 } from '../headlines/h1/h1'
import { LinkTo } from '../link/link.to'
import { SubmitButton } from '../submit.button/submit.button'

interface RegistrationFormProps {
  onSubmitUserInfo: SubmitHandler<IRegistrate>
}

export const RegistrationForm: FC<RegistrationFormProps> = ({
  onSubmitUserInfo
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<IRegistrate>({
    mode: 'onChange'
  })
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
