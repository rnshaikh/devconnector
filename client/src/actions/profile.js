import {setAlert} from './alert';
import axios from 'axios';
import{ PROFILE_ERROR, GET_PROFILE, ADD_EDUCATION_ERROR, ADD_EXPERIENCE_ERROR, DELETE_ACCOUNT,CLEAR_PROFILE,
        GET_ALL_PROFILE, ALL_PROFILE_ERROR, GET_REPO} from './types';


// current user profile
export const getCurrentUserProfile = ()=> async dispatch =>{

    try{
        ;
        const res = await axios.get('http://127.0.0.1:5000/api/profile/profile/')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    }
    catch(err){ 
        ;
        dispatch({
            type: PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }

}

export const getProfileByUserId = (id)=> async dispatch =>{

    try{
        ;
        const res = await axios.get(`http://127.0.0.1:5000/api/profile/user/${id}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    }
    catch(err){ 
        ;
        dispatch({
            type: PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }

}



export const getAllProfile = ()=> async dispatch =>{

    try{
        ;
        const res = await axios.get('http://127.0.0.1:5000/api/profile/all/')

        dispatch({
            type: GET_ALL_PROFILE,
            payload: res.data
        })

    }
    catch(err){ 
        ;
        dispatch({
            type: ALL_PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }

}


export const getGithubRepo = (handle)=> async dispatch =>{

    try{
        ;
        const res = await axios.get(`http://127.0.0.1:5000/api/profile/github/${handle}`)

        dispatch({
            type: GET_REPO,
            payload: res.data
        })

    }
    catch(err){ 
        ;
        dispatch({
            type: PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }

}



// create update profile
export const createProfile = (fromData, history, edit=false) => async dispatch =>{
    try{    
        console.log("Profile Form Data", fromData)
        ;
        if(fromData.skills.constructor === Array){
            fromData.skills = fromData.skills.join()
        }
        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.post('http://127.0.0.1:5000/api/profile/createupdateprofile/', fromData, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit? "Profile Updated": "Profile Created", "success"));
        
        
        history.push('/dashboard');
        


    }   
    catch(err){

        const errors = err.response.data.errors
        console.log(err)
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }
}


export const addEducation = (fromData, history, edit=false) => async dispatch=>{
    try{    
        
        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.post('http://127.0.0.1:5000/api/profile/addEducation/', fromData, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit? "Education Updated": "Education Added", "success"));
        
        
        history.push('/dashboard');
        


    }   
    catch(err){

        const errors = err.response.data.errors
        console.log(err)
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type: ADD_EDUCATION_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }   

}

export const addExperience = (fromData, history, edit=false) => async dispatch=>{
    try{    
        
        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.post('http://127.0.0.1:5000/api/profile/addExperience/', fromData, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit? "Education Updated": "Education Added", "success"));
        
        
        history.push('/dashboard');
        


    }   
    catch(err){

        const errors = err.response.data.errors
        console.log(err)
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type: ADD_EXPERIENCE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }   

}


export const deleteExperience = (id) => async dispatch =>{
    try{
        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.delete(`http://127.0.0.1:5000/api/profile/experience/${id}`, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Experience deleted", "success"));
    }
    catch(err){

        const errors = err.response.data.errors
        console.log(err)
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }   
}


export const deleteEducation = (id) => async dispatch =>{
    try{
        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.delete(`http://127.0.0.1:5000/api/profile/education/${id}`, config)
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Education deleted", "success"));
    }
    catch(err){

        const errors = err.response.data.errors
        console.log(err)
        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error,"danger"))
            });
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }   
}


export const deleteAccount = (id) => async dispatch =>{

    if(window.confirm("Are you sure?")){

        try{
            const config = {
                headers : {
                    "content-type": "application/json",
                }
            }
    
            const res = await axios.delete(`http://127.0.0.1:5000/api/profile/profile`, config)
            
            dispatch({
                type: CLEAR_PROFILE,
                payload: res.data
            });

            dispatch({
                type: DELETE_ACCOUNT,
                payload: res.data
            });
            dispatch(setAlert("Account deleted", "success"));
        }
        catch(err){
    
            const errors = err.response.data.errors
            console.log(err)
            if(errors){
                errors.forEach(error => {
                    dispatch(setAlert(error,"danger"))
                });
            }
    
            dispatch({
                type: PROFILE_ERROR,
                payload: {status:err.response.status, msg:err.response.statusText}
            });
    
        }

    }
       
}


