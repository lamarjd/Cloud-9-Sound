import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadSongForm from './UploadSongForm';

function UploadSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {/* Render the `Modal` component with
the `LoginForm` component as its child **only when** the `showModal` state
variable is `true` */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadSongForm />
        </Modal>
      )}
    </>
  );
}

export default UploadSongFormModal;