import React, { useState }from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal"
import UploadSongFormModal  from "../UploadSongFormModal"
import './Navigation.css';
import logo from "../assets/images/CLOUD9Logo.png"
import EditSongForm from "../Songs/EditSongForm"



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const [showUploadForm, setShowUploadForm] = useState(false)
  const [style, setStyle] = useState('visibile')

  // if (showUploadForm) {
  //   <UploadSongForm 
  //     onSubmit={() => setShowUploadForm(false)}
  //   />
  // }


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

  const handleClick = async (e) => {
    e.preventDefault();
    setShowUploadForm(true)
    // setStyle('hidden')    
  }

  const handleCancelClick = async (e) => {
    e.preventDefault();
    setShowUploadForm(false)
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
                <NavLink id="navlink-left" exact to="/">Home</NavLink>
              </span>
            <div className="left_center">                         
        
              {/* <span>Feed</span> */}
              {/* <span><NavLink id="navlink-left" exact to="/songs">Library</NavLink></span>               */}
            </div>
            </div>

            <div className="banner_right">

                  {isLoaded && sessionLinks}  
                  
                  </div>       
                                 
                  
                  </div>
      </div>
     
    
  );
}

export default Navigation;