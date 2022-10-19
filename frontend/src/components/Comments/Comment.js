import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, Switch, useHistory } from 'react-router-dom';
import { getComments, createComment, deleteComment } from "../../store/comments";
import "./Comment.css"

// import { allComments } from "../../store/comments.js"

const Comment = ({ songId }) => {
    // console.log(songId)
    const dispatch = useDispatch();
    const history = useHistory();

    const comments = useSelector(state => Object.values(state.comments));
    console.log("COMMENT SELECTOR", comments);
    
    const { commentId } = useParams();
    console.log("comment Id", commentId)

    
    useEffect(() => {
        dispatch(getComments(songId))
        // history.push(`/songs/${songId}`)
        // added songId to dispatch. Might want to remove        
    }, [dispatch])

    // const removeComment = (commentId, songId) => {
    //     dispatch(deleteComment(commentId, songId))
    // }
    const handleDelete = (id) => {
        console.log("ID from HANDLE DELETE", id)
        // e.preventDefault();
        dispatch(deleteComment(id))
        // dispatch(getComments(songId))
  
      }
    
    if (!comments.length) return null;

    return (
        <div>
            <h2>Song Comments</h2>
            <div className="comment-box">
    

                    {comments.map(comment => (
                        <div key={comment.id} className="single-comment">
                            {comment.body}
                            {console.log("This is the comment", comment)}
                            
                            <button id={comment.id} onClick={(e) => dispatch(deleteComment(e.target.id))}>Delete</button>
                        </div>

                    ))}
              

            </div>

        </div>
    )
}

export default Comment;