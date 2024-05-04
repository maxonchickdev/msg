import { Form, Input } from 'antd'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import HandleResponses from '../components/HandleResponses'
import { Loader } from '../components/Loader'
import Redirect from '../components/Redirect'
import RequiredHandler from '../components/RequiredHandler'
import { AuthContext } from '../contexts/AuthProvider'
import { LoginUser } from '../interfaces/Interfaces'
import MainLayout from '../layouts/MainLayout'
import { Services } from '../services/Services'

export const Login = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = React.useState(false)
  const [loginResponse, setLoginResponse] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { setName, setEmail } = React.useContext(AuthContext)
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<LoginUser>({
    mode: 'onChange',
  })
  const onSubmit: SubmitHandler<LoginUser> = async data => {
    setIsLoading(true)
    const response = await Services.loginUser(data)
    setName(response.name)
    setEmail(response.email)
    setLoginResponse(response)
    if (response.redirect === true) navigate('/main')
    setIsLoading(false)
    reset()
  }
  return (
    <MainLayout>
      <Form
        onSubmitCapture={handleSubmit(onSubmit)}
        className='max-w-[400px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full'
      >
        <h1 className='text-[20px] mb-3'>Login</h1>
        <Controller
          rules={{ required: 'Email is required' }}
          name='email'
          control={control}
          render={({ field }) => (
            <>
              <Input {...field} className='mb-2' placeholder='Your email' />
              {errors.email && (
                <RequiredHandler content={errors.email.message} />
              )}
            </>
          )}
        />
        <Controller
          rules={{ required: 'Password is required' }}
          name='password'
          control={control}
          render={({ field }) => (
            <>
              <Input.Password
                {...field}
                className='mb-2'
                placeholder='Your password'
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
        <CustomButton content={'Submit'} />
        <div className='flex items-start justify-between mt-1'>
          <Redirect path={'/auth'} content={'Registration'} />
          <Redirect path={'/password'} content={'Forgot password'} />
        </div>
        <HandleResponses message={loginResponse} />
        {isLoading ? <Loader /> : null}
      </Form>
    </MainLayout>
  )
}
