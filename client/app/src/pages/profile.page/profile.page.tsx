'use client'

import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ButtonColor, SubmitButton } from '../../components/submit.button/submit.button'
import { IProfile } from '../../interfaces/interfaces'
import { LoginRegistrateService } from '../../services/services'

export const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<IProfile | undefined>(undefined)
  const router = useRouter()
  useEffect(() => {
    const getProfileDetails = async () => {
      const token = getCookie('access_token')
      if(!token) {
        router.push('/')
        return null
      }
      const res = await LoginRegistrateService.profile(token as string)
      if(res.statusCode === 200) {
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

  return <>
    <p>{userDetails?.username}</p>
    <p>{userDetails?.email}</p>
    <SubmitButton content='Logout' color={ButtonColor.Default} onClick={() => {
      deleteCookie('access_token')
      router.push('/')
    }} />
  </>
}
