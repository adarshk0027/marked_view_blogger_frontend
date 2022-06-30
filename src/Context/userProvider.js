import React, { useReducer } from 'react'
import { Authentication_Context } from '../Context/userContext'
import { LOGIN_REQ, LOGIN_SUCCESS, LOGIN_FAILURE ,SIGN_OUT,RESET} from '../ACTIONS/user'
import { User_Reducer } from '../Reducers/userReducer'
let initialValues = {
  authenticating: false,
  authenticate: false,
  token: '',
  error: ''
}

function UserProvider (props) {
  const [state, dispatch] = useReducer(User_Reducer, initialValues)
  //login_req
  const login_req = () => {
    dispatch({
      type: LOGIN_REQ
    })
  }
  //login success
  const login_success = data => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data }
    })
  }
  const login_fail = error => {
    dispatch({
      type: LOGIN_FAILURE,
      payload: { error }
    })
  }
  const log_out=()=>{
     dispatch({type:SIGN_OUT})
  }
  const Reset=()=>{
    dispatch({type:RESET})
  }
  return (
    <Authentication_Context.Provider
      value={{ state, login_req, login_success, login_fail,log_out,Reset }}
    >
      {props.children}
    </Authentication_Context.Provider>
  )
}

export default UserProvider
