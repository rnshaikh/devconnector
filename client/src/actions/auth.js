import {setAlert} from './alert';
import axios from 'axios';
import{ REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './types';
import setAuthToken from '../utils/authToken';

export const loadUser = ()=> async dispatch=>{
    if(localStorage.token){
        await setAuthToken(localStorage.token);
    }
    
    try{
        const res = await axios.get('http://127.0.0.1:5000/api/users/currentUser/')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    }
    catch(err){
        
        dispatch({
            type: AUTH_FAIL
        })
    }
}



export const register = ({name, email, password, password2})=> async dispatch =>{

    const config = {
        headers : {
            "content-type": "application/json",
        }
    }

    const body = JSON.stringify({name, email, password, confirmPassword:password2});
    
    try{
        ;
        const res = await axios.post('http://127.0.0.1:5000/api/users/register/', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert("User Registered Successfully","success"))

    }
    catch(err){
        ;
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type:REGISTER_FAIL
        })   
    }

}




export const login = (email, password)=> async dispatch =>{

    const config = {
        headers : {
            "content-type": "application/json",
        }
    }

    const body = JSON.stringify({email, password});
    
    try{
        ;
        const res = await axios.post('http://127.0.0.1:5000/api/users/login/', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res
        })
        dispatch(loadUser());
    }
    catch(err){
        ;
        const errors = err.response.data.errors ? err.response.data.errors : err.response.data 
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type:LOGIN_FAIL
        })   
    }

}

export const logout = () => async dispatch =>{

    dispatch({
            type: LOGOUT
    })
    dispatch(setAlert("User Logout Successfully","success"))

}