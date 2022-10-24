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
      <h2>Song Comments</h2>
      <div className="comment-box">
        {comments.map((comment) => (
          <div key={comment.id} className="single-comment">
            {comment.body}
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
        ))}
      </div>
    </div>
  );
};

export default Comment;
