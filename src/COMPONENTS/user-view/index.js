import React, { useEffect, useState } from 'react'
import { Get_User } from '../../AdditionalFunction/user'
import MatierialInput from '../../MUI/element'
import { useParams } from 'react-router-dom'
import './style.css'
function UserView () {
  const user_id = localStorage.getItem('id')
  const [user, setUser] = useState({})
  const { id } = useParams()
  useEffect(() => {
    Get_User(id, setUser)
  }, [])
  return (
    <div className='user-container'>
      <h3 className='text-warning border-bottom'>User Profile</h3>
      <div className='user'>
        <div className='profile'>
          <img
            src={`${process.env.REACT_APP_BACK_END_HOST}${user.profilePicture ? user.profilePicture : "user.png"}`}
            alt='user image'
          ></img>
        </div>
        <div className='details pt-2'>
          <MatierialInput
            type='text'
            readOnly='true'
            value={` Name : ${user.firstName} ${user.lastName} ${
              user_id == user._id ? ' ( Me)' : ''
            }`}
          />

          <MatierialInput
            type='text'
            readOnly='true'
            value={`email : ${user.email} `}
          />
          <MatierialInput
            type='text'
            readOnly='true'
            value={`Nick Name : @${user.userName}`}
          />
          <p className='mt-2 text-primary'>im a Blogger</p>
        </div>
      </div>
    </div>
  )
}

export default UserView
