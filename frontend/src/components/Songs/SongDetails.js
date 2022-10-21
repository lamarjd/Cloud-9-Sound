import { useState, useEffect } from "react";
import { useParams, useHistory, Route } from "react-router-dom";
// import useDispatch for use
import { useSelector, useDispatch } from "react-redux";
// import the thunk
import { getOneSong, deleteSong } from "../../store/songs.js";
import EditSongForm from "./EditSongForm";
import { usePlayer } from "../../context/PlayerContext";
// comments
import { createComment, getComments } from "../../store/comments.js";
import AddCommentForm from "../Comments/AddCommentForm";
import Comment from "../Comments/Comment.js";
import "./Song.css";

const SongDetails = ({ songs, user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams();
  const { setUrl } = usePlayer();
  const song = useSelector((state) => {
    // if (!song) return null;
    return state.songs[songId];
  });
  // console.log("song Selector", song)
  
  const [showEditSongForm, setShowEditSongForm] = useState(false);
  const [editSongId, setEditSongId] = useState(null);
  
  // comments
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  useEffect(() => {
    setShowEditSongForm(false);
    setShowCommentForm(false);
    setEditSongId(null);
    dispatch(getOneSong(songId));
    
  }, [dispatch, songId]);
  
  if (!song) {
    return null;
  }
  
  // if (!user) {
  //   return null
  // }
  
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(song.id));
    history.push("/");
  };
  console.log("Is trhis working")

  return (
    <div className="outer-lining">
      <div className="song-detail-container">
        <div className="single-song-container">
          <h2>Song Details</h2>

          <div className="single-song-detail">
            <div className="pic-container">
              <img className="pic" src={song.imageUrl} />
            </div>

            <div className="play-button-div">
              <i
                onClick={() => setUrl(song.url)}
                className="fa-solid fa-circle-play"
              ></i>
            </div>
            <span className="player-image">
              <div>Song pic</div>
            </span>
            {/* <div className="wave-container">
            <div className="wave-image">Hello</div>
          </div> */}
          </div>
          <ul>
            <li>
              <b>Title: </b> {song.title}
            </li>
            <li>
              <b>Description: </b> {song.description}
            </li>
          </ul>


          <Comment user={user} />
          

          {!showEditSongForm && user && (
            <>
              {/* *  if the current user is valid, show the below options */}
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
                  
              {/* <Comment songId={songId} user={user} /> */}
              

              {showCommentForm && (
                <AddCommentForm
                songs={songs}
                setShowCommentForm={setShowCommentForm}
                onClick={() => setShowCommentForm(false)}
                />
                )}
            </>
          )}

          {/* {user === null || user && (
          )} */}
          

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
