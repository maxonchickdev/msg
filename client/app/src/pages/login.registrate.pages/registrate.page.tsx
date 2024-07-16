'use client'

import { RegistrationForm } from '../../components/forms/registrationForm'
import { RegLogLayout } from '../../layouts/reg.log.layout/reg.log.layout'
import style from './login.registrate.module.css'

export const RegistratePage = () => {
  return (
    <RegLogLayout>
      <div className={style.wrapper}>
        <RegistrationForm />
      </div>
    </RegLogLayout>
  )
}
