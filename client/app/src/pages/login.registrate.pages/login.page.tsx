'use server'

import { ILogin } from '@/app/src/interfaces/interfaces'
import { LoginForm } from '../../forms/login.form'
import { RegLogLayout } from '../../layouts/reg.log.layout/reg.log.layout'
import style from './login.registrate.module.css'

export const LoginPage = ({
  onSubmit,
}: {
  onSubmit: (data: ILogin) => Promise<void>
}) => {
  return (
    <RegLogLayout>
      <div className={style.wrapper}>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </RegLogLayout>
  )
}
