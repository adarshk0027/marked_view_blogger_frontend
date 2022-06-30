import React from 'react'

function Message({error}) {
  return (
    <div className='bg-danger w-100'>
      <p className='text-center'>{error}</p>
    </div>
  )
}

export default Message