'use client'

import { ILogin, INotify } from '@/app/src/utils/interfaces/interfaces'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginForm } from '../../components/forms/login.form'
import { notify } from '../../components/notify/notify'
import { LoginRegistrateService } from '../../services/services'
import { RegLogLayout } from '../../utils/layouts/reg.log.layout/reg.log.layout'

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { reset, control } = useForm<ILogin>({
    mode: 'onChange'
  })
  const onSubmitLogin: SubmitHandler<ILogin> = async data => {
    setIsLoading(true)
    const res: { statusCode: number; token: string; message: string } =
      await LoginRegistrateService.login(data)
    setIsLoading(false)
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
      <div className='max-w-[700px] w-full'>
        <LoginForm onSubmitLogin={onSubmitLogin} isLoading={isLoading} />
      </div>
    </RegLogLayout>
  )
}
