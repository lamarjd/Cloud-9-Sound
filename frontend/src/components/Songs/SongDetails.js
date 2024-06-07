import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSong, deleteSong } from "../../store/songs.js";
import { usePlayer } from "../../context/PlayerContext";
import EditSongForm from "./EditSongForm";
import AddCommentForm from "../Comments/AddCommentForm";
import Comment from "../Comments/Comment.js";
import "./Song.css";
import Player from "../AudioPlayer/AudioPlayer.js"; // Correct import

const SongDetails = ({ songs, user, progress }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const { url, setUrl, isPlaying, setIsPlaying, currentTime } = usePlayer();
  
  const song = useSelector((state) => {
    return state.songs[songId];
  });

  const [showEditSongForm, setShowEditSongForm] = useState(false);
  const [editSongId, setEditSongId] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  

  useEffect(() => {
    setShowEditSongForm(false);
    setShowCommentForm(false);
    setEditSongId(null);
    dispatch(getOneSong(songId));
  }, [dispatch, songId]);

  // useEffect(() => {
  //   if (song && song.url) {
  //     setUrl(song.url);
  //   }
  // }, [song, setUrl]);

  if (!song) {
    return null;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(song.id));
    history.push("/");
  };

  const handlePlayPause = () => {
    if (url !== song.url) {
      setUrl(song.url);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const progressBarStyle = {
    width: `${progress}%`,
    height: '100%',
    background: 'linear-gradient(to right, rgba(233, 59, 6, 0.473) 50%, transparent 0)'
  };



  return (
    <div className="outer-lining">
      <div className="song-detail-container">
        <div className="single-song-container">
          <h2>Song Details</h2>
          <div className="single-song-detail">
            <div className="pic-container">
              <img alt="song-pic" className="pic" src={song.imageUrl} />
            </div>
            <div className="play-button-div">
              {isPlaying && url === song.url ? (
                <i className="fa-solid fa-circle-pause" onClick={handlePlayPause}></i>
              ) : (
                <i className="fa-solid fa-circle-play" onClick={handlePlayPause}></i>
              )}
            </div>

            {/* Progress Bar */}
            <span className="player-image">
              {url === song.url && (
                <div className="progress-bar" style={progressBarStyle}></div>
              )}
            </span>
            {/*  */}

          </div>
          <ul>
            <li>
              <b className="song-title">Title: </b> {song.title}
            </li>
            <li>
              <b>Description: </b> {song.description}
            </li>
          </ul>


          <Comment user={user} />

          {!showEditSongForm && user && (
            <>
              <br />
              <div className="song-action-button-container">
                <button
                  id="single-song-button-actions"
                  onClick={() => setShowCommentForm(true)}
                  style={{ visibility: showCommentForm ? "hidden" : "visible" }}
                >
                  Add Comment
                </button>
                <button
                  id="single-song-button-actions"
                  onClick={() => setShowEditSongForm(true)}
                  style={{
                    visibility: user.id === song.userId ? "visible" : "hidden",
                  }}
                >
                  Edit Song
                </button>
                <button
                  id="single-song-button-actions"
                  onClick={handleDelete}
                  style={{
                    visibility: user.id === song.userId ? "visible" : "hidden",
                  }}
                >
                  Delete Song
                </button>
              </div>

              {showCommentForm && (
                <AddCommentForm
                  songs={songs}
                  setShowCommentForm={setShowCommentForm}
                  onClick={() => setShowCommentForm(false)}
                />
              )}
            </>
          )}

          {user && showEditSongForm && (
            <EditSongForm
              songId={editSongId}
              song={song}
              setShowEditSongForm={setShowEditSongForm}
              onClick={() => setShowEditSongForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
