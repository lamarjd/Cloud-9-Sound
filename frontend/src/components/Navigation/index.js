import React, { useState }from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import logo from "../assets/images/CLOUD9Logo.png"
import UploadSongForm  from "../Songs/UploadSongForm"
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
      <ProfileButton user={sessionUser} />
      {/* <UploadSongForm /> */}
      </>
      );
    } else {
      sessionLinks = (
        <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        {/* <EditSongForm /> */}
      </>
    );
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setShowUploadForm(true)
    setStyle('hidden')    
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
                <NavLink exact to="/">Home</NavLink>
              </span>
            <div className="left_center">                         
        
              <span>Feed</span>
              <span><NavLink exact to="/songs">Library</NavLink></span>              
            </div>
            </div>

            <div className="banner_right">

              <button className={style} onClick={handleClick}>

                <NavLink to="/songs">Upload</NavLink></button>

              {/* move this to render somehwere else in the body   */}
              {showUploadForm && (                
                <div className="form">
                <UploadSongForm  />                  
                </div>
                )}
                  {/* user button */}                  
                  {isLoaded && sessionLinks}  
                  
                  </div>       
                                 
                  
                  </div>
      </div>
     
    
  );
}

export default Navigation;