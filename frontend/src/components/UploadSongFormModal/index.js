import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadSongForm from './UploadSongForm';

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className="sign-in" onClick={() => setShowModal(true)}>Upload</button>
      {/* Render the `Modal` component with
the `LoginForm` component as its child **only when** the `showModal` state
variable is `true` */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UploadSongFormModal;