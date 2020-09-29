import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

function PostList({auth, post, deletePost, likePost, unlikePost}) {
    console.log("PostList", post, auth)


    const deletePostId = (id)=>{
        deletePost(id)
    }

    const LikePostId = (id) =>{
        likePost(id)
    }

    const unlikePostId = (id) =>{
        unlikePost(id)

    }
    return (
        <Fragment>
            {post.posts && post.posts !== null ? 
            post.posts.map(post=>(
                <div className="posts" key={post._id}>
                    <div className="post bg-white p-1 my-1">
                    <div>
                        <a href={post.avatar}>
                        <img
                            className="round-img"
                            src={post.avatar}
                            alt=""
                        />
                        <h4>{post.name}</h4>
                        </a>
                    </div>
                    <div key={post._id}>
                        <p className="my-1">
                        {post.text}
                        </p>
                        <p className="post-date">
                            Posted on  <Moment format="YYYY/MM/DD">
                                {post.date}
                            </Moment>
                        </p>
                        <button type="button" className="btn btn-light"
                        onClick= {()=>{LikePostId(post._id)}}
                        >
                        <i className="fa fa-thumbs-up"></i>
                            <span>{post.likes.length}</span>
                        </button>
                        <button type="button" className="btn btn-light" onClick={()=>{unlikePostId(post._id)}}>
                        <i className="fa fa-thumbs-down"></i>
                        </button>

                        <Link to={`posts/${post._id}`} className="btn btn-primary">
                            Discussion <span className='comment-count'>{post.comments.length}</span>
                        </Link>

                        {auth.user._id === post.user ? 
                            <button      
                            type="button"
                            onClick = {()=>{deletePostId(post._id)}}
                            className="btn btn-danger">
                                <i className="fa fa-times"></i>
                            </button>
                        :""}
                    </div>
                </div>
            </div>

            ))
            
            :<strong>No Posts Found</strong>}
            
        </Fragment>
    )
}

PostList.propTypes = {
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    deletePost : PropTypes.func.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired,
}

export default PostList

