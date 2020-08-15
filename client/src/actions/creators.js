import axios from 'axios'
import {receiveUser, logoutUser, receiveError} from './actionUtils'

export const signin=(user)=>{
    return async(dispatch)=>{
        
        const response=await axios.post('/api/login',user)
        const data=response.data.user
        if(response.data.status==='ok')
            return dispatch(receiveUser(data))
        else
        {
            return dispatch(receiveError(response.data.msg))
        } 
        
        
    }
}

export const signup=(user)=>{
    return async(dispatch)=>{
        const response=await axios.post('/api/register',user)

        const data=response.data.user
        if(response.data.status==='ok')
            return dispatch(receiveUser(data))
        else
        {
            return dispatch(receiveError(response.data.msg))

        }   
    }
}

export const logout=()=>{
    return async(dispatch)=>{
        const response=await axios.post('/api/logout')
        if(response.data.status==='ok')
            return dispatch(logoutUser())
        else
        {
            return dispatch(receiveError(response.data.msg))
        }   
    }
}



