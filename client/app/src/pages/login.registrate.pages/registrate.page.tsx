'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FlexWrapper } from '../../components/flex.wrapper/flex.wrapper'
import { H1 } from '../../components/headlines/h1/h1'
import { RegInput } from '../../components/input/reg.input'
import { LinkTo } from '../../components/link/link.to'
import { LogRegErr } from '../../components/log.reg.err/log.reg.err'
import { SubmitButton } from '../../components/submit.button/submit.button'
import { IRegLogErr, IRegistrate } from '../../interfaces/interfaces'
import { RegLogLayout } from '../../layouts/reg.log.layout/reg.log.layout'
import { LoginRegistrateService } from '../../services/services'
import style from './login.registrate.module.css'

export const RegistratePage = () => {
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
  } = useForm<IRegistrate>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<IRegistrate> = async data => {
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.registrate(data)
    if (res.statusCode === 200) {
      router.push('/')
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
            <H1 content='Registrate' />
            <LinkTo content='Login' href='/' />
          </FlexWrapper>
          <RegInput
            type='username'
            label='Username'
            placeholder='Enter username'
            name='username'
            register={register}
            errors={errors}
          />
          <RegInput
            type='email'
            label='Email'
            placeholder='Enter email'
            name='email'
            register={register}
            errors={errors}
          />
          <RegInput
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
