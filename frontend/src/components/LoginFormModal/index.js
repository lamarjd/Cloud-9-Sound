import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import "./LoginForm.css"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="sign-in" onClick={() => setShowModal(true)}>Log In</button>
      {/* Render the `Modal` component with
the `LoginForm` component as its child **only when** the `showModal` state
variable is `true` */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;