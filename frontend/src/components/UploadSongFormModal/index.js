import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UploadSongForm from "./UploadSongForm";

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sign-in" onClick={() => setShowModal(true)}>
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
