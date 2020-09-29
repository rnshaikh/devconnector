import {REGISTER_SUCCESS , REGISTER_FAIL, AUTH_FAIL, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, DELETE_ACCOUNT} from "../actions/types";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated : null,
    loading: true,
    user: null,

}

export default function(state=initialState,action){

    const {type, payload} = action

    switch(type){

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            ;
            localStorage.setItem('token', payload.data.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
                loading:false
            }
        
        case REGISTER_FAIL:
        case AUTH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated:false,
                token:null,
                loading: false
            }
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                ...payload
            }

        
        default:
            return state
    }

}