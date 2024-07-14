import toast from 'react-hot-toast'
import { INotify } from '../../interfaces/interfaces'

export const notify = (notifyData: INotify) => {
  toast.success(
    <div className='block'>
      <p className='text-nowrap'>
        <span className='font-bold'>Status code: </span> {notifyData.status}
      </p>
      <p className='text-nowrap'>
        <span className='font-bold'>Message: </span> {notifyData.message}
      </p>
    </div>,
    {
      duration: 3000,
      position: 'top-center',
      icon: notifyData.icon,
    }
  )
}
