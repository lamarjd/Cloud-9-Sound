// import the thunk action creator from the store / reducer
import { createComment } from "../../store/comment.js"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'


function AddCommentForm({ songId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [body, setBody] = useState('');
    // const [showForm, setShowForm] = useState(false)

    // const song = useSelector(state => state.songs);
    // console.log("SONG SELECTOR", song);

    const updateBody = (e) => setBody(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newComment = {
            songId,
            body
        }

        let addedComment = dispatch(createComment(newComment));

        if (addedComment) {
            history.push(`/songs/${songId}`)
        }
        reset();
    }

    const reset = () => {
        setBody('')
    }


  return (
    <section>
    <form className="upload_song" 
    onSubmit={handleSubmit}
    >
      <textarea 
      value={body}
      placeholder="Add Comment..." 
      onChange={updateBody}
      ></textarea>

        <button 
        type="submit"
        // onClick={handleSubmit}
        >Add Comment</button>

        
        <button type="button" >Cancel</button>
        
    </form>
</section>
  )
}

export default AddCommentForm;
