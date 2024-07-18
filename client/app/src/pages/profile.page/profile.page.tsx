'use client'

import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LoginRegistrateService } from '../../services/services'
import { IProfile } from '../../utils/interfaces/interfaces'

export const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<IProfile | undefined>(
    undefined
  )
  const router = useRouter()
  useEffect(() => {
    const getProfileDetails = async () => {
      const token = getCookie('access_token')
      if (!token) {
        router.push('/')
        return null
      }
      const res = await LoginRegistrateService.profile(token as string)
      if (res.statusCode === 200) {
        setUserDetails(res.message as IProfile)
      } else {
        router.push('/')
      }
    }
    getProfileDetails()
  }, [])

  if (!userDetails) {
    return null
  }

  return (
    <>
      <p>{userDetails?.username}</p>
      <p>{userDetails?.email}</p>
      {/* <SubmitButton
        content='Logout'
        color={ButtonColors.Default}
        onClick={() => {
          deleteCookie('access_token')
          router.push('/')
        }}
      /> */}
    </>
  )
}
