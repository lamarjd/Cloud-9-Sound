import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./Navigation.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <div className="user_button">
        <i id="menu" className="fas fa-user-circle" onClick={openMenu} />
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>
            <button onClick={logout}>Log Out</button>
          </p>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
