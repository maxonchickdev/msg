import toast from 'react-hot-toast'
import { INotify } from '../../interfaces/interfaces'

export const notify = (notifyData: INotify) => {
  toast.success(
    <p className='text-nowrap'>
      <span className='font-bold'>Status code: </span> {notifyData.status}{' '}
      <span className='font-bold'>Message: </span> {notifyData.message}
    </p>,
    {
      duration: 3000,
      position: 'top-right',
      icon: notifyData.icon,
      style: {
        maxWidth: 500
      }
    }
  )
}
