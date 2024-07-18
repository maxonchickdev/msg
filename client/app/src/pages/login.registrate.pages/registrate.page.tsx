'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import secureLocalStorage from 'react-secure-storage'
import { RegistrationForm } from '../../components/forms/registration.form'
import { ValidateCodeForm } from '../../components/forms/validate.code.form'
import { notify } from '../../components/notify/notify'
import { LoginRegistrateService } from '../../services/services'
import {
  INotify,
  IRegistrate,
  IVerificationCode
} from '../../utils/interfaces/interfaces'
import { RegLogLayout } from '../../utils/layouts/reg.log.layout/reg.log.layout'
import { getNotifyIcon } from '../../utils/notifications/notifications'

export const RegistratePage = () => {
  const [isSent, setIsSent] = useState<boolean>(false)
  const [isLoadingDetails, setIsLoadinDetails] = useState<boolean>(false)
  const [isLoadingCode, setIsLoadinCode] = useState<boolean>(false)
  const [isDisabledDetails, setIsDisabledDetails] = useState<boolean>(false)
  const [isDisabledCode, setIsDisabledCode] = useState<boolean>(false)
  const router = useRouter()
  const { reset } = useForm<IRegistrate>({ mode: 'onChange' })

  const onSubmitUserInfo: SubmitHandler<IRegistrate> = async data => {
    setIsLoadinDetails(true)
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.registrate(data)
    setIsLoadinDetails(false)
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: getNotifyIcon(res.statusCode)
    }
    if (res.statusCode === 200) {
      secureLocalStorage.setItem('email', data.email)
      setIsDisabledDetails(true)
      setIsSent(true)
      notify(notifyData)
      reset()
    } else {
      notify(notifyData)
    }
  }
  const onSubmitCode: SubmitHandler<IVerificationCode> = async data => {
    const email = secureLocalStorage.getItem('email')
    setIsLoadinCode(true)
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.validateUser(email as string, data.code)
    setIsLoadinCode(false)
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: getNotifyIcon(res.statusCode)
    }
    if (res.statusCode === 200) {
      setIsDisabledCode(true)
      notify(notifyData)
      router.push('/')
      reset()
    } else {
      notify(notifyData)
    }
  }

  return (
    <RegLogLayout>
      <div className='max-w-[700px] w-full'>
        <RegistrationForm
          isLoading={isLoadingDetails}
          isDisabled={isDisabledDetails}
          onSubmitUserInfo={onSubmitUserInfo}
        />
        {isSent ? (
          <>
            <ValidateCodeForm
              isLoading={isLoadingCode}
              isDisabled={isDisabledCode}
              onSubmitCode={onSubmitCode}
            />
          </>
        ) : null}
      </div>
    </RegLogLayout>
  )
}
