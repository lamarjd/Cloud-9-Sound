import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadSongForm from "./UploadSongForm";
import "./UploadSongForm.css"

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="upload-song" onClick={() => setShowModal(true)}>
        Upload
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UploadSongFormModal;
