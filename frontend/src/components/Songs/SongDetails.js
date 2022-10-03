import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import useDispatch for use
import { useSelector, useDispatch } from 'react-redux';
// import the thunk
import { getOneSong, deleteSong } from "../../store/songs.js"
import EditSongForm from "./EditSongForm"
import { usePlayer } from "../../context/PlayerContext"
import "./Song.css"

const SongDetails = ({songs}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    const {setUrl} = usePlayer();

    const song = useSelector((state) => {
        // if (!song) return null;
        return state.songs[songId]});
    // console.log("song Selector", song)

    const sessionUser = useSelector(state => state.session.user)

    const [showEditSongForm, setShowEditSongForm] = useState(false);
    const [editSongId, setEditSongId] = useState(null);

    
    useEffect(() => {
        setShowEditSongForm(false)
        setEditSongId(null)
        dispatch(getOneSong(songId))
    }, [dispatch, songId])

    if (!song) {
        return null;
        // history.push("/songs")
    }

    let content = null;

    if (showEditSongForm) {
        content = (
            <EditSongForm 
            songId={editSongId}
            song={song}
            onClick={() => setShowEditSongForm(false)}
            />
        );
    }



    return (
        <div className="song_details">
            <div className="single-song-container">


                <h2>Song Details</h2>
                <div className="single-song-detail">
                    

                        <img className="pic" src={song.imageUrl} />
                    <div>

                        <i onClick={() => setUrl(song.url)}
                            className="fa-solid fa-circle-play"></i>
                    </div>

                    
                </div>
                <ul>
                    <li>
                        <b>Title</b> {song.title}
                    </li>
                    <li>
                        <b>Description</b> {song.description}
                    </li>
                    <li>
                        <b>Artist</b> {song.artist}
                    </li>
                </ul>
                {( !showEditSongForm && sessionUser) && (

                    <>
                    {sessionUser &&
                    <button onClick={() => setShowEditSongForm(true)}>Edit Song</button>
                    }

                    <button onClick={() => dispatch(deleteSong(song.id))} >Delete Song</button>


                    </>

                )}
                {/* render the EditSongForm */}
                {content}
            </div>
        </div>
    )

}

export default SongDetails;