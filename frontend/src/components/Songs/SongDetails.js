import { useState, useEffect, useRef, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSong, deleteSong } from "../../store/songs.js";
import { usePlayer } from "../../context/PlayerContext";
import EditSongForm from "./EditSongForm";
import AddCommentForm from "../Comments/AddCommentForm";
import Comment from "../Comments/Comment.js";
import audio from "../assets/images/audio.png";
import "./Song.css";
import { PlayerContext } from "../../context/PlayerContext";
// import ReactAudioPlayer from 'react-audio-player';

const SongDetails = ({ songs, user }) => {

//   const playerContext = useContext(PlayerContext);
//   console.log("Player Context", playerContext)
//   // Direct Access to the current Timer Scrubber
//   const {currentTime, duration} = playerContext;

//   const percentagePlayed = (currentTime && duration) ? (currentTime / duration) * 100 : 0;
//   console.log("Percent", percentagePlayed + "%");
  
//   const progressBarStyle = {
//     background: `linear-gradient(to right, rgba(233, 59, 6, 0.473) 50%, transparent 0)`
// };

// useEffect(() => {
// console.log("Hello from useeffect")
//   console.log("Current Time", currentTime)
// }, [currentTime, duration])


  const dispatch = useDispatch();
  // const player = useRef(null)
  const history = useHistory();
  const { songId } = useParams();
  const { url, setUrl, isPlaying, setPlaybackState } = usePlayer(); // Use isPlaying from context
  
  
  const song = useSelector((state) => {
    return state.songs[songId];
  });

  const [showEditSongForm, setShowEditSongForm] = useState(false);
  const [editSongId, setEditSongId] = useState(null);

  const [showCommentForm, setShowCommentForm] = useState(false);

  const [isPlayed, setIsPlayed] = useState(false)

  useEffect(() => {
    setShowEditSongForm(false);
    setShowCommentForm(false);
    setEditSongId(null);
    dispatch(getOneSong(songId));
  }, [dispatch, songId]);

  

  if (!song) {
    return null;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(song.id));
    history.push("/");
  };

  const handlePlayPause = () => {
    setPlaybackState(!isPlaying); // Toggle playback state in context
    if (!isPlaying) {
      setUrl(song.url); // Only set URL if we're about to play
    }
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
        {isPlaying && url === song.url ? ( // Check if this song is currently playing
          <i className="fa-solid fa-circle-pause" onClick={handlePlayPause}></i>
        ) : (
          <i className="fa-solid fa-circle-play" onClick={handlePlayPause}></i>
        )}
      </div>
            <span className="player-image" >

              {/* GO  !!!!!!!!!!!!!!!!!!!!!!!111 */}
              
              {/* <img alt="audio-wave" src={audio} /> */}
           
      
 
            </span>
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
