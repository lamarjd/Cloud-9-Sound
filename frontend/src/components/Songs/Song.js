import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, useParams, Switch } from "react-router-dom";
// import "./Song.css";
import "./SongTest.css";
// import UploadSongForm from "./UploadSongForm"
import SongDetails from "./SongDetails";

import { getSongs } from "../../store/songs.js";

const Song = ({ songs }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => {
    return state.songs;
  });
  // console.log("SONG", song)

  const [showUploadForm, setShowUploadForm] = useState(false);

  const songArr = Object.values(song);
  // console.log("SONGARR", songArr)

  // const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setShowUploadForm(false);
    dispatch(getSongs());
  }, [dispatch]);

  if (!song) {
    return null;
  }

  return (
    <div className="container">
      {/* <h3> Here's what's trending</h3>  */}
      {!showUploadForm && (
        <div className="song_list">
          {/* Library Song list page */}
          {songArr.map(({ id, title, imageUrl }) => {
            return (
              <div key={id} className="song">
                <NavLink
                  className="song-link"
                  key={song.id}
                  to={`/songs/${id}`}
                >
                  <img src={imageUrl} />
                  <br />
                  {title}
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Song;
