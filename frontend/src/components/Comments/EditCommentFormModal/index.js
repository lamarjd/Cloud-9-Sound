import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditCommentForm from "./EditCommentForm";
import "../Comment.css"


function EditCommentFormModal() {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
        <button className="edit-comment" onClick={() => setShowModal(true)}>
            Edit
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditCommentForm setShowModal={setShowModal} />
          </Modal>
        )}
      </>
    );
  }
  
  export default EditCommentFormModal;