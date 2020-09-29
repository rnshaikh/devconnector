import React,{Fragment} from 'react';
import{ connect }  from "react-redux";
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import {removeComment} from '../../actions/post';


function CommentList({comments, auth, post_id, removeComment}) {

    console.log("Comments", comments, post_id)

    const removeCommentId = (comment_id)=>{
        removeComment(post_id, comment_id)
    }

    return (
        <Fragment>

            {comments.map(comment=>{
               return(<div className="post bg-white p-1 my-1" key={comment._id}>
                <div>
                    <a href="profile.html">
                    <img
                        className="round-img"
                        src={comment.avatar}
                        alt=""
                    />
                    <h4>{comment.name}</h4>
                    </a>
                </div>
                <div>
                    <p className="my-1">
                    {comment.text}
                    </p>
                    <p className="post-date">
                    Posted on <Moment format="YYYY/MM/DD">
                        {comment.date}
                    </Moment>
                    </p>
                    {auth.user._id === comment.user ?
                        <button type="button" className="btn btn-danger" onClick={()=>{removeCommentId(comment._id)}}>
                            <i className="fa fa-times"></i>
                        </button> : ""
                    }
                </div>
            </div>)
            })}
        </Fragment>
    )
}

CommentList.propTypes = {
    comments : PropTypes.array.isRequired,
    auth : PropTypes.object.isRequired,
    removeComment: PropTypes.func.isRequired,
    post_id: PropTypes.string.isRequired,
}

const mapStateToProps=state=>({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, {removeComment})(CommentList);