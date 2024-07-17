'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import secureLocalStorage from 'react-secure-storage'
import { RegistrationForm } from '../../components/forms/registrationForm'
import { notify } from '../../components/notify/notify'
import { INotify, IRegistrate } from '../../interfaces/interfaces'
import { RegLogLayout } from '../../layouts/reg.log.layout/reg.log.layout'
import { LoginRegistrateService } from '../../services/services'
import style from './login.registrate.module.css'

export const RegistratePage = () => {
  const { reset } = useForm<IRegistrate>({ mode: 'onChange' })
  const onSubmitUserInfo: SubmitHandler<IRegistrate> = async data => {
    console.log(data)
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.registrate(data)
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: res.statusCode === 200 ? '✅' : res.statusCode === 409 ? '⚠️' : '🚫'
    }
    if (res.statusCode === 200) {
      secureLocalStorage.setItem('email', data.email)
      notify(notifyData)
      // router.push('/')
      reset()
    } else {
      notify(notifyData)
    }
  }
  return (
    <RegLogLayout>
      <div className={style.wrapper}>
        <RegistrationForm onSubmitUserInfo={onSubmitUserInfo} />
      </div>
    </RegLogLayout>
  )
}
