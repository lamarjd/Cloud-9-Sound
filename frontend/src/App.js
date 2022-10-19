import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Song from "./components/Songs/Song"
import SplashPage from "./components/SplashPage/SplashPage"
import SongDetails from "./components/Songs/SongDetails"
// import UploadSongForm from "./components/Songs/UploadSongForm"
import Player from './components/AudioPlayer/AudioPlayer.js';
// import SplashPage from "./components/SplashPage"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {!user && 
    <SplashPage user={user}/>    
    }
    {/* <Route path="/welcome"> */}
    <Navigation isLoaded={isLoaded} />
    {/* </Route> */}
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/songs">
            <Song />
          </Route>
          {/* <Route path="/upload">
            <UploadSongForm />
          </Route> */}
          <Route path="/songs/:songId">
            <SongDetails />
          </Route>
        </Switch>
      )}
      {/* </Navigation> */}
      <Player />
    </>
  );
}

export default App;