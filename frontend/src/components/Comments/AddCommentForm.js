// import the thunk action creator from the store / reducer
import { createComment } from "../../store/comments.js"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import "./Comment.css"



function AddCommentForm({ setShowCommentForm }) {
  // console.log("songId", songId)
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId } = useParams();
 
    const [body, setBody] = useState('');
    // const [showCommentForm, setShowCommentForm] = useState(false)

    // const song = useSelector(state => state.songs);
    // console.log("SONG SELECTOR", song);

    const updateBody = (e) => setBody(e.target.value)

    useEffect(() => {
      // setBody('');
    }, [dispatch, body])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            // id: id,
            songId,
            body
        }
        // console.log("NEWCOMMENT", newComment)

        let addedComment = await dispatch(createComment(songId, newComment));

        if (addedComment) {
            history.push(`/songs/${songId}`)
        }
        reset();
    }

    const reset = () => {
        setBody('')
        setShowCommentForm(false)
    }

    const handleCancelClick = (e) => {
      e.preventDefault();
      setShowCommentForm(false)
    }


  return (
    <section>
    <form className="add-comment" 
    onSubmit={handleSubmit}
    >
      <textarea 
      value={body}
      placeholder="Add Comment..." 
      onChange={updateBody}
      ></textarea>
      <br/>

      <span className="button_box">

        <button 
        type="submit"
        onClick={handleSubmit}
        >Add Comment</button>
        <br/>

        
        <button onClick={handleCancelClick} type="reset" >Cancel</button>
        <br/>
        </span>
        
    </form>
</section>
  )
}

export default AddCommentForm;
