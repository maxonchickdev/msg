import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import MainLayout from '../layouts/MainLayout'

export const Main = () => {
  const navigate = useNavigate()
  const { name, email } = React.useContext(AuthContext)
  console.log(name, email)
  useEffect(() => {
    const checkStates = (name: string, email: string) => {
      if (name === '' || email === '') navigate('/undefind')
    }
    checkStates(name, email)
  }, [name, email])
  return (
    <MainLayout>
      <div className='max-w-[400px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full'>
        <p>
          <span className='font-bold'>Name: </span> {name}
        </p>
        <p>
          <span className='font-bold'>Email: </span>
          {email}
        </p>
      </div>
    </MainLayout>
  )
}
