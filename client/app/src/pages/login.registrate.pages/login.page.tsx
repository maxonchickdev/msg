'use client'

import { ILogin, INotify } from '@/app/src/interfaces/interfaces'
import { Input } from '@nextui-org/input'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { FlexWrapper } from '../../components/flex.wrapper/flex.wrapper'
import { H1 } from '../../components/headlines/h1/h1'
import { LinkTo } from '../../components/link/link.to'
import { notify } from '../../components/notify/notify'
import { SubmitButton } from '../../components/submit.button/submit.button'
import { RegLogLayout } from '../../layouts/reg.log.layout/reg.log.layout'
import { LoginRegistrateService } from '../../services/services'
import style from './login.registrate.module.css'

export const LoginPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control
  } = useForm<ILogin>({
    mode: 'onChange'
  })
  const onSubmitLogin: SubmitHandler<ILogin> = async data => {
    const res: { statusCode: number; token: string; message: string } =
      await LoginRegistrateService.login(data)
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: res.statusCode === 200 ? '✅' : '🚫'
    }
    if (res.statusCode === 200) {
      notify(notifyData)
      setCookie('access_token', res.token, { secure: true, sameSite: 'none' })
      router.push('/profile')
      reset()
    } else {
      notify(notifyData)
    }
  }
  return (
    <RegLogLayout>
      <div className={style.wrapper}>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
          <FlexWrapper>
            <H1 content='Login' />
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
      </div>
    </RegLogLayout>
  )
}
