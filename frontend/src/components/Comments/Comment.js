import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, deleteComment, editComment } from "../../store/comments";
import EditCommentFormModal from "./EditCommentFormModal";
import "./Comment.css";

const Comment = ({ user }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();

  const [showEditCommentForm, setShowEditCommentForm] = useState(false)

  const comments = useSelector((state) => Object.values(state.comments));

  useEffect(() => {
    dispatch(getComments(songId));
    setShowEditCommentForm(false);
  }, [dispatch, songId]);

  if (!comments.length) return null;



  return (
    <div className="comment-container">
      <h2>Song Comments</h2>
      <div className="comment-box">
        {comments.map((comment) => (
          <div key={comment.id} className="single-comment">
            {comment.body}

      {/* Comment Button Options */}
      <div className="comment-btn">
          {!showEditCommentForm && user.id === comment.userId && (
            <EditCommentFormModal songId={songId} comment={comment}/>
          )}

            <button
              id={comment.id}
              onClick={(e) => dispatch(deleteComment(e.target.id))}
              style={{
                visibility:
                  user && user.id === comment.userId ? "visible" : "hidden",
              }}
            >
              Delete
            </button>
            </div>
          </div>
        ))}



      </div>
    </div>
  );
};

export default Comment;
