import { useSelector } from 'react-redux'
import { useHistory, NavLink, Route } from 'react-router-dom';
import Song from "../Songs/Song"
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from "../SignupFormModal"
import logo from "../assets/images/CLOUD9Logo.png"
import splash1 from "../assets/images/splash1.jpg"
import "./SplashPage.css"

function SplashPage({ user }) {

  return (
    <>
    {!user && 
      <div className="splash-container">
        <div className="splash-content">

        <div className="splash-picture-container">
          <img id="splashImg" src={splash1} />
          <div className="top-left">
            <img id="logo" alt="logo" src={logo}/>
          </div>

          <div class="top-right">
 
        <Route exact path="/">
          <LoginFormModal />
          <SignupFormModal />
        </Route>
  


 
          </div>



          <div className="center">
            <h1>Welcome to Cloud 9</h1>
            <h3>Join the community and start sharing your music today.</h3>
            <h5>For Artists, by Artists</h5>
          </div>
        </div> <br />
        <div className="song-display">
          
            <Song />
          
        </div>
        </div>
      </div>
    }
    </>
  )
}

export default SplashPage;