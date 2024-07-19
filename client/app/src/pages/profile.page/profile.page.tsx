'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { notify } from '../../components/notify/notify'
import { LoginRegistrateService } from '../../services/services'
import { INotify, IProfile } from '../../utils/interfaces/interfaces'
import { getNotifyIcon } from '../../utils/notifications/notifications'

export const ProfilePage = () => {
  const [res, setRes] = useState<string | IProfile>()
  const [status, setStatus] = useState<number>(0)
  const router = useRouter()
  useEffect(() => {
    const getProfileDetails = async () => {
      const { status, message } = await LoginRegistrateService.profile()
      if (status === 200) {
        setRes(message as IProfile)
      } else {
        setRes(message as string)
      }
    }
    getProfileDetails()
  }, [])

  if (!res) return null

  const notifyData: INotify = {
    status: status,
    message: message as string,
    icon: getNotifyIcon(status)
  }
  notify(notifyData)
  router.push('/')

  return (
    <>
      <p>{userDetails.username}</p>
      <p>{userDetails.email}</p>
      <p>{new Date(userDetails.createdAt).toDateString()}</p>
    </>
  )
}
