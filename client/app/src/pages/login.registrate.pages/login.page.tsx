'use client'

import { ILogin, INotify } from '@/app/src/utils/interfaces/interfaces'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginForm } from '../../components/forms/login.form'
import { notify } from '../../components/notify/notify'
import { LoginRegistrateService } from '../../services/services'
import { RegLogLayout } from '../../utils/layouts/reg.log.layout/reg.log.layout'
import { getNotifyIcon } from '../../utils/notifications/notifications'

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()
  const { reset } = useForm<ILogin>({
    mode: 'onChange'
  })
  const onSubmitLogin: SubmitHandler<ILogin> = async data => {
    setIsLoading(true)
    const { status, message } = await LoginRegistrateService.login(data)
    setIsLoading(false)
    if (status === 200) {
      // notify(notifyData)
      router.push('/profile')
      // reset()
    } else {
      const notifyData: INotify = {
        status: status,
        message: message,
        icon: getNotifyIcon(status)
      }
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
