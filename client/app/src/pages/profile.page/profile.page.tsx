'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { notify } from '../../components/notify/notify'
import { LoginRegistrateService } from '../../services/services'
import { INotify, IProfile } from '../../utils/interfaces/interfaces'
import { getNotifyIcon } from '../../utils/notifications/notifications'

export const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<IProfile>()
  const router = useRouter()
  useEffect(() => {
    const getProfileDetails = async () => {
      const { status, message } = await LoginRegistrateService.profile()
      if (status === 200) {
        setUserDetails(message as IProfile)
      } else {
        console.log(status, message)
        const notifyData: INotify = {
          status: status,
          message: message as string,
          icon: getNotifyIcon(status)
        }
        notify(notifyData)
        router.push('/')
      }
    }
    getProfileDetails()
  }, [userDetails])

  console.log(userDetails)

  return <>Hi</>
}
