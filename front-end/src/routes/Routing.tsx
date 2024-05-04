import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '../contexts/AuthProvider'
import { EmailProvider } from '../contexts/EmalProvider'
import { Auth } from '../pages/Auth'
import { EnterCode } from '../pages/EnterCode'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Login } from '../pages/Login'
import { Main } from '../pages/Main'
import { NewPassword } from '../pages/NewPassword'
import { NotFound } from '../pages/NotFound'

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
        <Route
          path='/auth'
          element={
            <AuthProvider>
              <Auth />
            </AuthProvider>
          }
        />
        <Route
          path='/code'
          element={
            <EmailProvider>
              <EnterCode />
            </EmailProvider>
          }
        />
        <Route
          path='/main'
          element={
            <AuthProvider>
              <Main />
            </AuthProvider>
          }
        />
        <Route
          path='/password'
          element={
            <EmailProvider>
              <ForgotPassword />
            </EmailProvider>
          }
        />
        <Route
          path='/new-password'
          element={
            <EmailProvider>
              <NewPassword />
            </EmailProvider>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
