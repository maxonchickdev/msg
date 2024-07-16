'use client'

import { Input } from '@nextui-org/input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { INotify, IVerificationCode } from '../../interfaces/interfaces'
import { LoginRegistrateService } from '../../services/services'
import { FlexWrapper } from '../flex.wrapper/flex.wrapper'
import { H1 } from '../headlines/h1/h1'
import { LinkTo } from '../link/link.to'
import { notify } from '../notify/notify'
import { SubmitButton } from '../submit.button/submit.button'

export const ValidateCodeForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<IVerificationCode>({
    mode: 'onChange'
  })
  const onSubmitUserInfo: SubmitHandler<IVerificationCode> = async data => {
    const res: { statusCode: number; message: string } =
      await LoginRegistrateService.registrate(data.code)
    localStorage.setItem()
    const notifyData: INotify = {
      status: res.statusCode,
      message: res.message,
      icon: res.statusCode === 200 ? '✅' : '🚫'
    }
    if (res.statusCode === 200) {
      console.log('ping')
      notify(notifyData)
      // router.push('/')
      reset()
    } else {
      notify(notifyData)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmitUserInfo)}>
      <FlexWrapper>
        <H1 content='Registrate' />
        <LinkTo content='Login' href='/' />
      </FlexWrapper>
      <Controller
        control={control}
        rules={{ required: true }}
        name='code'
        render={({ field: { value, onChange } }) => (
          <Input
            type='text'
            label='Validation code'
            placeholder='Enter code'
            defaultValue={value}
            onChange={onChange}
          />
        )}
      />
      <SubmitButton content='Submit' />
    </form>
  )
}
