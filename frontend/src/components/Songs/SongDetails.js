import { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOneSong, deleteSong } from "../../store/songs.js";
import { usePlayer } from "../../context/PlayerContext";
import EditSongForm from "./EditSongForm";
import AddCommentForm from "../Comments/AddCommentForm";
import Comment from "../Comments/Comment.js";
import audio from "../assets/images/audio.png";
import "./Song.css";

const SongDetails = ({ songs, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();

  const { url, setUrl, isPlaying, setIsPlaying } = usePlayer(); // Use isPlaying from context
  
  const song = useSelector((state) => {
    return state.songs[songId];
  });

  const [showEditSongForm, setShowEditSongForm] = useState(false);
  const [editSongId, setEditSongId] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);

  // Reset edit form and comment form when song changes
  useEffect(() => {
    setShowEditSongForm(false);
    setShowCommentForm(false);
    setEditSongId(null);
    dispatch(getOneSong(songId));
  }, [dispatch, songId]);

  // Set URL when song changes
  useEffect(() => {
    if (song && song.url) {
      setUrl(song.url)
    }
  }, [song, setUrl])

  if (!song) {
    return null;
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(song.id));
    history.push("/");
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Update playback state in context
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
              {isPlaying && url === song.url ? (
                <i className="fa-solid fa-circle-pause" onClick={handlePlayPause}></i>
              ) : (
                <i className="fa-solid fa-circle-play" onClick={handlePlayPause}></i>
              )}
            </div>
            <span className="player-image">
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
