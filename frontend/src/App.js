import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Song from "./components/Songs/Song"
// import SplashPage from "./components/SplashPage/SplashPage"
import SongDetails from "./components/Songs/SongDetails"
// import UploadSongForm from "./components/Songs/UploadSongForm"
import Player from './components/AudioPlayer/AudioPlayer.js';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    {/* <Route path="/welcome"> */}
    {/* </Route> */}
    <Navigation isLoaded={isLoaded} />
    {/* <SplashPage /> */}
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
          {/* <Route path="/songs/:songId">
            <SongDetails />
          </Route> */}
        </Switch>
      )}
      <Player />
    </>
  );
}

export default App;