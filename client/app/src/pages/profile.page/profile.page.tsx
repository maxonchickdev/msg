'use client'

import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

export const ProfilePage = () => {
  const [cookieToken, setCookieToken] = useState<string>('')
  useEffect(() => {
    const token = getCookie('access_token')
    setCookieToken(token as string)
  }, [])
  return <h1>Token: {cookieToken}</h1>
}
