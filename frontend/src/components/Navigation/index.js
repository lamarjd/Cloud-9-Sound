import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from "../assets/images/CLOUD9Logo.png"

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
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
 
      <div className="top_container">

        <div className="banner_container">
          <div className="banner_logo">
            <div className="logo_button" id="logo">
              <img className="logo" src={logo} alt="logo"/>       
            </div>
          </div>
          
            <div className="banner_left">
              <span className="home">
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}   
              </span>
            </div>

            <div className="left_center">
              <span>Feed</span>
            </div>
            <div className="left_center">
              <span>Library</span>
            </div>
          
        </div>
      </div>
     
    
  );
}

export default Navigation;