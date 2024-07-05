'use client'

import { ILogin, IRegLogErr } from '@/app/src/interfaces/interfaces'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FlexWrapper } from '../../components/flex.wrapper/flex.wrapper'
import { H1 } from '../../components/headlines/h1/h1'
import { LogInput } from '../../components/input/log.input'
import { LinkTo } from '../../components/link/link.to'
import { LogRegErr } from '../../components/log.reg.err/log.reg.err'
import { SubmitButton } from '../../components/submit.button/submit.button'
import { RegLogLayout } from '../../layouts/reg.log.layout/reg.log.layout'
import { LoginRegistrateService } from '../../services/services'
import style from './login.registrate.module.css'

export const LoginPage = () => {
  const [errResponse, setErrResponse] = useState<IRegLogErr>({
    statusCode: 0,
    message: '',
  })
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
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.login(data)
    if (res.statusCode === 200) {
      setCookie('access_token', res.message)
      router.push('/profile')
      reset()
    } else {
      setErrResponse(res)
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
        {errResponse.statusCode ? (
          <>
            <LogRegErr err={errResponse} />
          </>
        ) : null}
      </div>
    </RegLogLayout>
  )
}
