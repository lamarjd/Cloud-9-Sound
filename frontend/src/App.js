import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Song from "./components/Songs/Song";
import SplashPage from "./components/SplashPage/SplashPage";
import SongDetails from "./components/Songs/SongDetails";
import Player from "./components/AudioPlayer/AudioPlayer.js";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <div className="App">
      {!user && (
        <Switch>
          <Route exact path="/songs/:songId">
            <Navigation isLoaded={isLoaded} />
            <SongDetails user={user} setProgress={setProgress} progress={progress} currentTime={currentTime} setCurrentTime={setCurrentTime}/> {/* Pass setProgress */}
          </Route>
          <Route exact path="/">
            <SplashPage user={user} />
          </Route>
        </Switch>
      )}
      {isLoaded && (
        <Switch>
          <Route exact path="/songs/:songId"></Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
      {user && (
        <Switch>
          <Route exact path="/songs/:songId">
            <Navigation isLoaded={isLoaded} />
            <SongDetails user={user} setProgress={setProgress} progress={progress} currentTime={currentTime} setCurrentTime={setCurrentTime}/> {/* Pass setProgress */}
            {/* <Player /> */}
          </Route>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <Song user={user} />
          </Route>
        </Switch>
      )}
        <Player setProgress={setProgress} progress={progress} currentTime={currentTime} setCurrentTime={setCurrentTime}/> {/* Pass setProgress */}
    </div>
  );
}

export default App;
