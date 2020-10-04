import {setAlert} from './alert';
import axios from 'axios';
import{ GET_POST, POST_ERROR,GET_ALL_POST } from './types';

export const createPost = (fromData, history, edit=false) => async dispatch =>{
    try{    
        console.log("Profile Form Data", fromData)
        ;

        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.post('/api/posts/', fromData, config)
        
        if (res.status === 200){
            const res = await axios.get(`/api/posts/`)

            dispatch({
                type: GET_ALL_POST,
                payload: res.data
            })

            dispatch(setAlert("Post Added", "success"));
        }
        else{
            dispatch({
                type: POST_ERROR,
                payload: {status:res.status, msg:res.msg}
            });
        }
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
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }
}


export const getPost = ()=> async dispatch =>{

    try{

        const res = await axios.get(`/api/posts/`)

        dispatch({
            type: GET_ALL_POST,
            payload: res.data
        })

    }
    catch(err){ 
        ;
        dispatch({
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }

}


export const getPostById = (id)=> async dispatch =>{

    try{

        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })

    }
    catch(err){ 
        ;
        dispatch({
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }
}


export const deletePost = (id)=> async dispatch =>{

    try{

        const res = await axios.delete(`/api/posts/${id}`)

        if (res.status === 200){
            const res = await axios.get(`/api/posts/`)

            dispatch({
                type: GET_ALL_POST,
                payload: res.data
            })

            dispatch(setAlert("Post deleted", "success"));
        }
        else{
            dispatch({
                type: POST_ERROR,
                payload: {status:res.status, msg:res.msg}
            });
        }

    }
    catch(err){ 
        ;
        dispatch({
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }
}



export const likePost = (id)=> async dispatch =>{

    try{

        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const body = {"msg": "text"}

        const res = await axios.put(`/api/posts/like/${id}`, body, config)

        if (res.status === 200){
            const res = await axios.get(`/api/posts/`)

            dispatch({
                type: GET_ALL_POST,
                payload: res.data
            })

            dispatch(setAlert("Post liked", "success"));
        }
        else{
            dispatch({
                type: POST_ERROR,
                payload: {status:res.status, msg:res.msg}
            });
        }

    }
    catch(err){ 
        ;
        dispatch({
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.data.msg            }
        });
        dispatch(setAlert(err.response.data.msg, "danger"));
    }
}


export const unlikePost = (id)=> async dispatch =>{

    try{

        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const body = {"text": "msg"}

        const res = await axios.put(`/api/posts/unlike/${id}`, body, config)

        if (res.status === 200){
            const res = await axios.get(`/api/posts/`)

            dispatch({
                type: GET_ALL_POST,
                payload: res.data
            })

            dispatch(setAlert("Post unliked", "success"));
        }
        else{
            dispatch({
                type: POST_ERROR,
                payload: {status:res.status, msg:res.msg}
            });
        }

    }
    catch(err){ 
        ;
        dispatch({
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.data.msg}
        });
        dispatch(setAlert(err.response.data.msg, "danger"));
    }
}
 


export const createComment = (fromData, id) => async dispatch =>{
    ;
    try{    
        console.log("comment Form Data", fromData)
        ;

        const config = {
            headers : {
                "content-type": "application/json",
            }
        }

        const res = await axios.post(`/api/posts/comment/${id}`, fromData, config)
        
        if (res.status === 200){
            const res = await axios.get(`/api/posts/${id}`)

            dispatch({
                type: GET_POST,
                payload: res.data
            })
            dispatch(setAlert("Comment Added", "success"));
        }
        else{
            dispatch({
                type: POST_ERROR,
                payload: {status:res.status, msg:res.msg}
            });
        }
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
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });

    }
}

export const removeComment = (id, comment_id) => async dispatch =>{
    try{

        const res = await axios.delete(`/api/posts/comment/${id}/${comment_id}`)

        if (res.status === 200){
            const res = await axios.get(`/api/posts/${id}`)

            dispatch({
                type: GET_POST,
                payload: res.data
            })
            dispatch(setAlert("Comment removed", "success"));
        }
        else{
            dispatch({
                type: POST_ERROR,
                payload: {status:res.status, msg:res.msg}
            });
        }

    }
    catch(err){ 
        ;
        dispatch({
            type: POST_ERROR,
            payload: {status:err.response.status, msg:err.response.statusText}
        });
    }
}
