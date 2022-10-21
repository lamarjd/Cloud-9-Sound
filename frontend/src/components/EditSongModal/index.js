import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSongForm from './EditSongForm';
import "./EditSongForm.css"

function EditSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sign-in" onClick={() => setShowModal(true)}>Log In</button>
      {/* Render the `Modal` component with
the `EditSongForm` component as its child **only when** the `showModal` state
variable is `true` */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm 
                      // songId={editSongId}
                      // song={song}
                      // setShowEditSongForm={setShowEditSongForm}
                      // onClick={() => setShowEditSongForm(false)}
                      showModal={showModal}
                      setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}

export default EditSongModal;