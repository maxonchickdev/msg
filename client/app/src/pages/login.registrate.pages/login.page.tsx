'use client'

import { ILogin, INotify } from '@/app/src/interfaces/interfaces'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FlexWrapper } from '../../components/flex.wrapper/flex.wrapper'
import { H1 } from '../../components/headlines/h1/h1'
import { LogInput } from '../../components/input/log.input'
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
  } = useForm<ILogin>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<ILogin> = async data => {
    const res: { statusCode: number; token: string; message: string } =
      await LoginRegistrateService.login(data)
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: res.statusCode === 200 ? '✅' : '🚫',
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FlexWrapper>
            <H1 content='Login' />
            <LinkTo content='Registrate' href='/registrate' />
          </FlexWrapper>
          <LogInput
            type='email'
            label='Email'
            placeholder='Enter email'
            name='email'
            register={register}
            errors={errors}
          />
          <LogInput
            type='password'
            label='Password'
            placeholder='Enter password'
            register={register}
            name='password'
            errors={errors}
          />
          <SubmitButton content='Submit' />
        </form>
      </div>
    </RegLogLayout>
  )
}
