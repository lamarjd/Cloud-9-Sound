import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getSongs } from "../../store/songs.js";
import "./Song.css";

const Song = ({ user }) => {
  const dispatch = useDispatch();
  const song = useSelector((state) => {
    return state.songs;
  });

  const [showUploadForm, setShowUploadForm] = useState(false);

  const songArr = Object.values(song);

  useEffect(() => {
    setShowUploadForm(false);
    dispatch(getSongs());
  }, [dispatch]);

  if (!song) {
    return null;
  }

  return (
    <div className="container">
      {!user ? (
        <h3> Here's what's trending Today</h3>
      ) : (
        <h3>Check out the songs that are making waves in the community</h3>
      )}
      {!showUploadForm && (
        <div className="song_list">
          {songArr.map(({ id, title, imageUrl }) => {
            return (
              <div key={id} className="song">
                <NavLink
                  className="song-link"
                  key={song.id}
                  to={`/songs/${id}`}
                >
                  <img alt="song-pic" src={imageUrl} />
                  <br />
                  {title}
                  <hr />
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
