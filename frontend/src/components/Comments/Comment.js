import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, deleteComment } from "../../store/comments";
import "./Comment.css";

const Comment = ({ user }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();

  const comments = useSelector((state) => Object.values(state.comments));

  useEffect(() => {
    dispatch(getComments(songId));
  }, [dispatch, songId]);

  if (!comments.length) return null;

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