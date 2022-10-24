import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditSongForm from "./EditSongForm";
import "./EditSongForm.css";

function EditSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sign-in" onClick={() => setShowModal(true)}>
        Log In
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm showModal={showModal} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;
