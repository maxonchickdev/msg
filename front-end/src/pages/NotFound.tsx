import React from 'react'
import { Loader } from '../components/Loader'
import MainLayout from '../layouts/MainLayout'

export const NotFound = () => {
  return (
    <MainLayout>
      <div className='max-w-[400px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full flex items-center justify-center gap-4'>
        <p className='text-[30px] font-semibold'>Page not found</p>
        <Loader />
      </div>
    </MainLayout>
  )
}
