import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from "../assets/images/CLOUD9Logo.png"
// audio player



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
              </span>
            <div className="left_center">                         
        
              <span>Feed</span>
              <span><NavLink exact to="/songs">Library</NavLink></span>              
            </div>
            </div>

            <div className="banner_right">
              {/* <button className="upload" >Upload</button> */}
                  {/* user button */}
                {isLoaded && sessionLinks}  
            </div>
          

            
          
        </div>
      </div>
     
    
  );
}

export default Navigation;