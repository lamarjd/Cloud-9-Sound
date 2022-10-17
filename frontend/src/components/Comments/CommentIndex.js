import { useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteComment, getComments } from "../../store/comments"

const CommentIndex = ({ comment, songId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { commentId } = useParams();
    // console.log("COMMENT", commentId);

    useEffect(() => {
        // dispatch(getComments(songId))
        history.push(`/songs/${songId}`)
    }, [dispatch])

    return (
        <li key={comment.id}>
          {comment.body}
          {/* <Link to={`/comments/${comment.id}/edit`}>Edit</Link> */}
          <button onClick={() => dispatch(deleteComment(comment.id))}>Delete</button>
        </li>
      );
}

export default CommentIndex;