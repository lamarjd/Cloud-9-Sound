import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, Switch } from 'react-router-dom';
import { getComments, createComment, deleteComment } from "../../store/comments";
import "./Comment.css"

// import { allComments } from "../../store/comments.js"

const Comment = ({ songId }) => {
    // console.log(songId)
    const dispatch = useDispatch();
    const comments = useSelector(state => Object.values(state.comments));
    // console.log("COMMENT SELECTOR", Object.values(comments))
    const { commentId } = useParams();
    console.log("comment Id", comments[commentId])

    
    useEffect(() => {
        dispatch(getComments(songId))
        // added songId to dispatch. Might want to remove
    }, [dispatch, songId])

    const removeComment = (commentId, songId) => {
        dispatch(deleteComment(commentId, songId))
    }
    
    if (!comments) return null;

    return (
        <div>
            <h2>Song Comments</h2>
            <div className="comment-box">
                
                    {comments.map(({id, body}) => {
                        return <div className="single-comment" key={id} >{body}
                        <button onClick={removeComment}>Delete Comment</button>
                        </div>
                    })}
              

            </div>

        </div>
    )
}

export default Comment;