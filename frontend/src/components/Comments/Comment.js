import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, Switch, useHistory } from 'react-router-dom';
import { getComments, createComment, deleteComment } from "../../store/comments";
import "./Comment.css"

// import { allComments } from "../../store/comments.js"

const Comment = ({ user }) => {
    // console.log(songId)
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
    
    // const songId = song.id
    
    const comments = useSelector(state => Object.values(state.comments));
    // console.log("COMMENT SELECTOR", comments);
    
    useEffect(() => {
        dispatch(getComments(songId))
        // history.push(`/songs/${songId}`)
        // added songId to dispatch. Might want to remove        
    }, [dispatch, songId])
    
    // const removeComment = (commentId, songId) => {
        //     dispatch(deleteComment(commentId, songId))
        // }
        // const handleDelete = (id) => {
            // console.log("ID from HANDLE DELETE", id)
            // e.preventDefault();
            // dispatch(deleteComment(id))
            // dispatch(getComments(songId))
            
            //   }
            
            if (!comments.length) return null;
            // if(!user) return null;
            console.log("is this workiong from Comment")

  return (
    <div className="comment-container">
      

    <div className="comment-insights">

  <h4 id="insight-text">


    <i className="fa-solid fa-comment"></i>&nbsp;{comments.length} Comments
  
  </h4>
    </div>


      <div className="comment-box">
        {comments.map((comment) => (
          <div key={comment.id} className="single-comment">
            
            {/* <div className="user-icon-box">me</div> */}

            <p>
            {comment.body}            
            </p>
            {/* Only the owner of the comment can delete a comment */}
            { user && user.id === comment.userId &&

              <button
              id={comment.id}
              onClick={(e) => dispatch(deleteComment(e.target.id))}
                >
              <i className="fa-solid fa-trash"></i>
            </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment; 