import { showLoading, hideLoading } from 'react-redux-loading'
import { saveUser } from "../utils/api"
import { setAuthedUser } from './authedUser'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER = 'ADD_USER'


export function receiveUsers(users)
{
    return{
        type: RECEIVE_USERS,
        users,
    }
}

export function addUser (user) {
    return {
      type: ADD_USER,
      user,
    }
  }

  export function handleAddUser(id, name,password, avatarURL) {
    return (dispatch) => {
      
      dispatch(showLoading())
      dispatch(addUser({id, name,password, avatarURL}))
      dispatch(setAuthedUser(id))
      dispatch(hideLoading())
      return saveUser({
        id,
        name,
        password,
        avatarURL,
      })
      
    }
  }