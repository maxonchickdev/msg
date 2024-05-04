import { Form, Input } from 'antd'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import HandleResponses from '../components/HandleResponses'
import { Loader } from '../components/Loader'
import Redirect from '../components/Redirect'
import RequiredHandler from '../components/RequiredHandler'
import { EmailContext } from '../contexts/EmalProvider'
import { INewPassword } from '../interfaces/Interfaces'
import MainLayout from '../layouts/MainLayout'
import { Services } from '../services/Services'

export const NewPassword = () => {
  const { email } = React.useContext(EmailContext)
  const navigate = useNavigate()
  const [newPasswordRes, setNewPasswordRes] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [passwordVisibleOneMore, setPasswordVisibleOneMore] =
    React.useState(false)
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<INewPassword>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<INewPassword> = async data => {
    const { password, one_more_password } = data
    setIsLoading(true)
    const response: string = await Services.updatePassword({
      password,
      one_more_password,
      email,
    })
    setNewPasswordRes(response)
    if (response === 'Password updated successfully') {
      navigate('/')
    }
    setIsLoading(false)
    reset()
  }
  return (
    <MainLayout>
      <Form
        onSubmitCapture={handleSubmit(onSubmit)}
        className='max-w-[400px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full'
      >
        <h1 className='text-[20px] mb-1'>Enter new password</h1>
        <Controller
          rules={{ required: 'New password is required' }}
          name='password'
          control={control}
          render={({ field }) => (
            <>
              <Input.Password
                {...field}
                className='mb-2'
                placeholder='Your new password'
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
              {errors.password && (
                <RequiredHandler content={errors.password.message} />
              )}
            </>
          )}
        />
        <Controller
          rules={{ required: 'New password is required' }}
          name='one_more_password'
          control={control}
          render={({ field }) => (
            <>
              <Input.Password
                {...field}
                className='mb-2'
                placeholder='Your new password one more'
                visibilityToggle={{
                  visible: passwordVisibleOneMore,
                  onVisibleChange: setPasswordVisibleOneMore,
                }}
              />
              {errors.one_more_password && (
                <RequiredHandler content={errors.one_more_password.message} />
              )}
            </>
          )}
        />

        <CustomButton content={'Submit'} />
        <div className='flex items-start justify-between mt-1'>
          <Redirect path={'/'} content={'Login'} />
          <Redirect path={'/auth'} content={'Registration'} />
        </div>
        <HandleResponses message={newPasswordRes} />
        {isLoading ? <Loader /> : null}
      </Form>
    </MainLayout>
  )
}
