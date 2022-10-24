import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import UploadSongFormModal from "../UploadSongFormModal";
import "./Navigation.css";
import logo from "../assets/images/CLOUD9Logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <UploadSongFormModal />
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className="top_container">
      <div className="banner_container">
        <div className="banner_logo">
          <div className="logo_button" id="logo">
            <img className="logo" src={logo} alt="logo" />
          </div>
        </div>

        <div className="banner_left">
          <span className="home">
            <NavLink id="navlink-left" exact to="/">
              Home
            </NavLink>
          </span>
          <div className="left_center"></div>
        </div>

        <div className="banner_right">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
