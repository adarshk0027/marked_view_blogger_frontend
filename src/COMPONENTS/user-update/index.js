import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Authentication_Context } from '../../Context/userContext'
import { AiFillCamera } from 'react-icons/ai'
import MatierialInput from '../../MUI/element'
import './style.css'
import { Get_User, Update_User } from '../../AdditionalFunction/user'
function UserUpdate () {
  const { userId } = useParams()
  const Navigate = useNavigate()
  const { authenticate } = useContext(Authentication_Context).state
  const [userDetails, setDetails] = useState({})
  //console.log(userDetails)
  const handleInputChange = (key, value) => {
    setDetails({ ...userDetails, [key]: value })
    console.log(userDetails)
  }
  const handleImageChange = value => {
    setDetails({ ...userDetails, ['profilePicture']: value })
    console.log(userDetails)
  }
  const handleSubmit = () => {
    const form = new FormData()
    form.append('_id', userDetails._id)
    form.append('firstName', userDetails.firstName)
    form.append('lastName', userDetails.lastName)
    form.append('userName', userDetails.userName)
    form.append('email', userDetails.email)
    form.append('profilePicture', userDetails.profilePicture)
    Update_User(form, setDetails, userDetails)
  }
  useEffect(() => {
    Get_User(userId, setDetails)
  }, [])
  return (
    <div className='contain'>
      {!authenticate && Navigate('/')}
      <h3 className='text-warning border-bottom'>User Updation</h3>
      <div className='user d-flex'>
        <div className='profile-update'>
          <img
            src={`${process.env.REACT_APP_BACK_END_HOST}${
              userDetails.profilePicture
                ? userDetails.profilePicture
                : 'user.png'
            }`}
            alt='image user'
          />
          <div className='icon'>
            <input
              type={'file'}
              accept='image/*'
              onChange={e => {
                handleImageChange(e.target.files[0])
              }}
            />
            <AiFillCamera className='camera'></AiFillCamera>
          </div>
        </div>
        <div className='details mt-2 pt-2'>
          <div className='d-flex mt-1'>
            <MatierialInput
              label='first name'
              type='text'
              value={userDetails.firstName}
              name='fname'
              placeholder='first name'
              onChange={e => {
                handleInputChange('firstName', e.target.value)
              }}
            />
            <MatierialInput
              label='last name'
              type='text'
              value={userDetails.lastName}
              name='lname'
              placeholder='last name'
              onChange={e => {
                handleInputChange('lastName', e.target.value)
              }}
            />
          </div>

          <MatierialInput
            label='email'
            type='text'
            value={userDetails.email}
            name='email'
            placeholder='email'
            onChange={e => {
              handleInputChange('email', e.target.value)
            }}
          />
          <MatierialInput
            label='user   name'
            type='text'
            value={userDetails.userName}
            name='name'
            onChange={e => {
              handleInputChange('userName', e.target.value)
            }}
          />
          <button
            className='btn btn-success mt-2'
            onClick={() => {
              handleSubmit()
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserUpdate
