export const RECEIVE_USER = 'RECEIVE_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const RECEIVE_ERROR = 'RECEIVE_ERROR'

export const receiveUser=(user)=>{
    return {
        type:RECEIVE_USER,
        user:user
    }
}

export const logoutUser=()=>{
    return{
        type:LOGOUT_USER
    }
}

export const receiveError=(msg)=>{
    return{
        type:RECEIVE_ERROR,
        msg
    }
}