import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Song from "./components/Songs/Song"
import SplashPage from "./components/SplashPage/SplashPage"
import SongDetails from "./components/Songs/SongDetails"
import Comment from "./components/Comments/Comment"
// import UploadSongForm from "./components/Songs/UploadSongForm"
import Player from './components/AudioPlayer/AudioPlayer.js';
// import SplashPage from "./components/SplashPage"
import "./index.css"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const user = useSelector(state => state.session.user)

  
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  // if (!user) return null;

  return (
    <div className="App">
    {!user && 
    <Switch>
      <Route exact path="/songs/:songId">
        <Navigation isLoaded={isLoaded} />
        {/* <Comment user={user}/> */}
        <SongDetails user={user}/>
      </Route>
      <Route exact path="/">
        <SplashPage user={user}/>  
      </Route>
    </Switch>
     }
      {isLoaded && (
        <Switch>
          <Route exact path="/songs/:songId">
            {/* <Navigation isLoaded={isLoaded} /> */}
            {/* <SongDetails user={user}/> */}
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
        )}
        {user && 
      <Switch>
          <Route exact path="/songs/:songId">
            {/* <Comment /> */}
            <Navigation isLoaded={isLoaded} />
            <SongDetails user={user}/>
            {/* <Comment user={user}/> */}
          </Route>
          <Route exact path="/">
            <Navigation isLoaded={isLoaded} />
            <Song user={user}/>
          </Route>
      </Switch>
      }
      <Player />
    </div>
  );
}

export default App;