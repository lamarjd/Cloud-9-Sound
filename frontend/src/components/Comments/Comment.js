import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, Switch, useHistory } from 'react-router-dom';
import { getComments, createComment, deleteComment } from "../../store/comments";
import  CommentIndex  from"./CommentIndex";
import "./Comment.css"

// import { allComments } from "../../store/comments.js"

const Comment = ({ songId }) => {
    // console.log(songId)
    const dispatch = useDispatch();
    const history = useHistory();
    const comments = useSelector(state => Object.values(state.comments));
    console.log("COMMENT SELECTOR", comments);
    const { commentId } = useParams();
    // console.log("comment Id", commentId)

    
    useEffect(() => {
        dispatch(getComments(songId))
        history.push(`/songs/${songId}`)
        // added songId to dispatch. Might want to remove        
    }, [dispatch, songId, commentId])

    // const removeComment = (commentId, songId) => {
    //     dispatch(deleteComment(commentId, songId))
    // }
    
    if (!comments) return null;

    return (
        <div>
            <h2>Song Comments</h2>
            <div className="comment-box">
                
                    {/* {comments.map((comment) => (
                         <CommentIndex 
                         key={comment.id}
                         className="single-comment" 
                         comment={comment}
                         songId={songId} />
                    ))} */}

                    {comments.map(comment => (
                        <div key={comment.id} className="single-comment">
                            {comment.body}
                            {/* <CommentIndex comment={comment}/> */}

                            <button key={comment.id} onClick={() => dispatch(deleteComment(comment.id))}>Delete</button>
                        </div>

                    ))}
              

            </div>

        </div>
    )
}

export default Comment;