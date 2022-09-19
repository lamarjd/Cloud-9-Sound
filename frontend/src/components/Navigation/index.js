import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./images/CLOUD9Logo.png"
// const fontSearch = "https://kit.fontawesome.com/81680de5ef.js"


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <section id="top_bar">
      <div className="top_container">
        <div className="banner_container">
          <div className="banner_logo">
            <div className="logo_button" id="logo">
              <img className="logo" src={logo} alt="logo" />
            </div>
          </div>
          <span className="banner_container_left">
            <div className="banner_left">
              <div className="home" id="home">
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
              </div>
            </div>
            <div className="left_center">
              <span id="stream">Stream</span>
            </div>
            <div className="left_center">
             <span id="library">Library</span>
            </div>
          </span> 

          <div className="banner_search" id="search" >
            <input type="search" placeholder="Search"/>Search
          </div>

        </div>
      </div>
    </section>
 
    
  );
}

export default Navigation;