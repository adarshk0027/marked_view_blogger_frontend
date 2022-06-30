import {LOGIN_REQ,LOGIN_SUCCESS,LOGIN_FAILURE, SIGN_OUT,RESET} from '../ACTIONS/user'
export const User_Reducer=(state,action)=>{
  switch(action.type){
    case LOGIN_REQ:return{
        ...state,
        authenticating:true,
    }
    case LOGIN_SUCCESS:return{
        ...state,
        authenticating:false,
        authenticate:true,
        token:action.payload.token,
        user:action.payload.user
    }
    case LOGIN_FAILURE:return{
        ...state,
        authenticating:false,
        error:action.payload.error
    }
    case SIGN_OUT:return{
      ...state,
      token:"",
      authenticate:false
    }
    case RESET : return{
      ...state,
      error:""
    }
    default:return{}
  }
}