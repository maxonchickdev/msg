import { Input } from '@nextui-org/input'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ILogin, LoginFormProps } from '../../utils/interfaces/interfaces'
import { FlexWrapper } from '../flex.wrapper/flex.wrapper'
import { LinkTo } from '../link/link.to'
import { ButtonColors, SubmitButton } from '../submit.button/submit.button'

export const LoginForm: FC<LoginFormProps> = ({ onSubmitLogin, isLoading }) => {
  const { handleSubmit, control } = useForm<ILogin>({
    mode: 'onChange'
  })
  return (
    <form onSubmit={handleSubmit(onSubmitLogin)}>
      <FlexWrapper>
        <h1 className='font-bold text-2xl'>Login</h1>
        <LinkTo content='Registrate' href='/registrate' />
      </FlexWrapper>
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
            className='my-2'
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
            className='my-2'
          />
        )}
      />
      <SubmitButton
        isLoading={isLoading}
        content='Submit'
        color={ButtonColors.Primary}
      />
    </form>
  )
}
