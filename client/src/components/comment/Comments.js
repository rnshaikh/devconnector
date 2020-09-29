import React,{useEffect, Fragment} from 'react';
import{ connect }  from "react-redux";
import { useState } from 'react'
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {getPostById, createComment, removeComment} from '../../actions/post';
import CommentList from './CommentList';
import Moment from 'react-moment';

function Comments({match,post,auth, getPostById, createComment, removeComment}) {
    
    const [formdata, setformdata] = useState({
        text:"",

    });
    const {
        text,
    } = formdata;

    useEffect(() => {
        getPostById(match.params.id);
    }, [getPostById]);


    console.log("comment.js", post.post)
    
    
    const onChange =(e)=>{ setformdata({...formdata, [e.target.name]:e.target.value})};
    const onSubmit = (e)=>{
        ;
        e.preventDefault();
        createComment(formdata,post.post._id)
        setformdata({...formdata, text:""})
    }


    return post.loading ? <Spinner></Spinner>:
        (
        <Fragment>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                <a href="profile.html">
                    <img
                    className="round-img"
                    src={post.post.gravtar}
                    alt=""
                    />
                    <h4>{post.post.name}</h4>

                </a>
                </div>
                <div>
                <p className="my-1">
                    {post.post.text}
                </p>
                <p className="post-date">
                    Posted on  <Moment format="YYYY/MM/DD">
                        {post.date}
                    </Moment>
                </p>
                </div>
            </div>

            <div className="post-form" onSubmit={e=> onSubmit(e)}> 
                <div className="bg-primary p">
                <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1">
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    value={text}
                    placeholder="Comment on this post"
                    onChange = {(e)=>onChange(e)}
                    required
                ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
                </form>
            </div>

            <CommentList comments={post.post.comments} auth={auth} removeComment={removeComment} post_id={post.post._id}></CommentList>
        </Fragment>
    )
}

Comments.propTypes = {
    post: PropTypes.object.isRequired,
    getPostById: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    removeComment: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired,
}

const mapStateToProps=state=>({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getPostById, createComment, removeComment })(Comments);
