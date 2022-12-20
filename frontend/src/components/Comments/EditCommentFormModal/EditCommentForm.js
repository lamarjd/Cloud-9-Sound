import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editComment, getComments } from "../../../store/comments";
import "../Comment.css"


function EditCommentForm({ comment, songId, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { commentId } = useParams();

  let id = commentId

  const [body, setBody] = useState("")
  const [errors, setErrors] = useState([]);

  const updateBody = (e) => setBody(e.target.value)

  useEffect(() => {
    setBody(comment && comment.body)
  }, [comment])

  useEffect(() => {
    dispatch(getComments(songId));
  }, [dispatch]);


const handleSubmit = async (e) => {
  e.preventDefault()

  let validationErrors = [];

  if (body.length < 1) {
    validationErrors.push("Comments must be longer than 1 character")
  }

  setErrors(validationErrors)

  const payload = {
    id,
    body
  }

  let editedComment = await dispatch(editComment(payload))

  if (editedComment) {
    // setShowModal(false)
    history.push(`/songs/${songId}`)
  }
}

const handleCancelClick = (e) => {
       e.preventDefault()
        setShowModal(false)
}

  return (
    <div>
            <ul>
        {errors &&
          errors.map((error) => {
            return (
              <li className="errors" key={error}>
                {error}
              </li>
            );
          })}
      </ul>
      <div className="edit-comment">

      Edit this comment
        <form className="edit-comment-form" 
        onSubmit={handleSubmit}
        >

          <input
            type="text"
            min="1"
            max="250"
            required
            value={body}
            onChange={updateBody}
            />
          <button type="submit" onClick={handleSubmit}>
            Save Changes
          </button>
      <button 
      onClick={handleCancelClick}
      >Cancel</button>
      </form>
      </div>
    </div>
  )
}

export default EditCommentForm;