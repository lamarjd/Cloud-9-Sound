import { useState, useEffect } from "react";
import { useParams, useHistory, Route } from "react-router-dom";
// import useDispatch for use
import { useSelector, useDispatch } from "react-redux";
// import the thunk
import { getOneSong, deleteSong } from "../../store/songs.js";
import EditSongForm from "./EditSongForm";
import { usePlayer } from "../../context/PlayerContext";
// comments
import { createComment } from "../../store/comments.js";
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

<<<<<<< HEAD
  // const user = useSelector((state) => state.session.user);
  // console.log(user)

=======
>>>>>>> dev
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
  
<<<<<<< HEAD
  if (!user) {
    alert("Please sign in")
    history.push("/")
  }
=======
  // if (!user) {
  //   alert("Please sign in")
  //   history.push("/")
  // }
>>>>>>> dev

  return (
      <div className="song_details">
      <div className="single-song-container">
<<<<<<< HEAD
      <h2>Song Details</h2>
      <div className="single-song-detail">
      <img className="pic" src={song.imageUrl} />
      <div className="play-button-div">
      <i
      onClick={() => setUrl(song.url)}
      className="fa-solid fa-circle-play"
      ></i>
      </div>
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
    <li>
    <b>Artist ID: </b> {song.userId}
    </li>
    </ul>
    {!showEditSongForm && user && (
      <>
      {/* *  if the current user is valid, show the below options */}
      
      <button onClick={() => setShowEditSongForm(true)}
      style={{visibility: user.id === song.userId ? "visible" : "hidden"}}
      >Edit Song</button>
      
      
      <button onClick={() => setShowCommentForm(true)} style={{visibility: showCommentForm ? "hidden" : "visible"}}>
      Add Comment
      </button>
      
      <button onClick={() => dispatch(deleteSong(song.id))}
      style={{visibility: user.id === song.userId ? "visible" : "hidden"}}
      >
              Delete Song
            </button>
=======
        <h2>Song Details</h2>
        <div className="single-song-detail">
          <img className="pic" src={song.imageUrl} />
          <div className="play-button-div">
            <i
              onClick={() => setUrl(song.url)}
              className="fa-solid fa-circle-play"
            ></i>
          </div>
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
          {/* <li> */}
            {/* <b>Artist: </b> {user.username} */}
          {/* </li> */}
        </ul>


        {!showEditSongForm && user && (
          <>
            {/* *  if the current user is valid, show the below options */}

            <button onClick={() => setShowEditSongForm(true)}
            style={{visibility: user.id === song.userId ? "visible" : "hidden"}}
            >Edit Song</button>


            <button onClick={() => setShowCommentForm(true)} style={{visibility: showCommentForm ? "hidden" : "visible"}}>
              Add Comment
            </button>

            <button onClick={() => dispatch(deleteSong(song.id))}
             style={{visibility: user.id === song.userId ? "visible" : "hidden"}}
            >
              Delete Song
            </button>

            <Comment key={song.id} songId={songId} user={user} />

>>>>>>> dev
            {
              showCommentForm && (
                
                <AddCommentForm
                songs={songs}
                setShowCommentForm={setShowCommentForm}
                onClick={() => setShowCommentForm(false)}
                />
                )
              }
              
              </>
              )}

<<<<<<< HEAD
        <Comment key={song.id} songId={songId} user={user}/>
        
        {showEditSongForm && (
=======
          </>
        )}

        {!user &&
          <Comment />
        }
                
        {user && showEditSongForm && (
>>>>>>> dev
          <EditSongForm
          songId={editSongId}
          song={song}
          setShowEditSongForm={setShowEditSongForm}
          onClick={() => setShowEditSongForm(false)}
          />
          )}
          </div>
          </div>
      
    );
  };

export default SongDetails;
