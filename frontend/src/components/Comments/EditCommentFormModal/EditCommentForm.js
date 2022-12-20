import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


function EditCommentForm({ setShowModal }) {

const handleCancelClick = (e) => {
       e.preventDefault()
        setShowModal(false)
}

  return (
    <div>
      Edit this comment dude, it sucked or you misspelled something I'm sure
      <button 
      onClick={handleCancelClick}
      >Cancel</button>
    </div>
  )
}

export default EditCommentForm;