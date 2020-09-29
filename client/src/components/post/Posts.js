import React,{useEffect, Fragment} from 'react';
import{ connect }  from "react-redux";
import { getPost, createPost, deletePost, likePost, unlikePost } from '../../actions/post';
import { useState } from 'react'
import PropTypes from 'prop-types';
import PostList from './PostList';


function Posts({auth, post, getPost, createPost, deletePost, likePost, unlikePost, history}) {

    const [formdata, setformdata] = useState({
        text:"",

    });
    const {
        text,
    } = formdata;

    useEffect(() => {
        getPost();
    }, [getPost]);

    console.log("Posts.js", post)
    const onChange =(e)=>{ setformdata({...formdata, [e.target.name]:e.target.value})};
    const onSubmit = (e)=>{
        e.preventDefault();
        createPost(formdata, history)
        setformdata({...formdata, text:""})
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Posts
            </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Say Something...</h3>
                </div>
                <form className="form my-1" onSubmit={e=> onSubmit(e)}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        value={text}
                        placeholder="Create a post"
                        required
                        onChange={(e)=>onChange(e)}
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>

            <PostList auth={auth} post={post} deletePost={deletePost} likePost={likePost} unlikePost={unlikePost}></PostList>
        </Fragment>
    )
}

Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
    deletePost : PropTypes.func.isRequired,
    likePost : PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}
const mapStateToProps=state=>({
    auth : state.auth,
    post: state.post,
    posts : state.posts,
})
  
export default connect(mapStateToProps, { getPost, createPost, deletePost, likePost, unlikePost})(Posts);
