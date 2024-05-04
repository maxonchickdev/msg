import React from 'react'

const HandleResponses = ({ message }: { message: string }) => {
  return <div className='text-left font-bold text-[12px]'>{message}</div>
}

export default React.memo(HandleResponses)
