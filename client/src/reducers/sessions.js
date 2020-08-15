import {RECEIVE_USER, LOGOUT_USER, RECEIVE_ERROR} from '../actions/actionUtils'

const initialState={
    userId:null,
    role:null,
    email:null,
    msg:''
}

function reducer(state=initialState,action)
{
	console.log('reducer',state,action)
	Object.freeze(state)
    switch(action.type)
    {
        case RECEIVE_USER:
            const obj={
                ...state,
                email:action.user.email,
            	userId:action.user.id,
                role:action.user.role,
                msg:''
            }
            return obj
            
        case LOGOUT_USER:
            return initialState
        case RECEIVE_ERROR:
            return{
                ...state,msg:action.msg
            }
        default:
            return state
    }
}

export default reducer