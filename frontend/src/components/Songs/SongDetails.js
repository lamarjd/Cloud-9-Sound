import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import useDispatch for use
import { useSelector, useDispatch } from 'react-redux';
// import the thunk
import { getOneSong, deleteSong } from "../../store/songs.js"
import EditSongForm from "./EditSongForm"

const SongDetails = ({songs}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    const song = useSelector((state) => {
        // if (!song) return null;
        return state.songs[songId]});
    console.log("song Selector", song)

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

    const hideBtn = () => {

    }


    return (
        <div className="song_details">
            <div>
                <h2>Song Details</h2>
                <ul>
                    <li>
                        <b>Album</b> {song.album}
                    </li>
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
                    <button onClick={() => setShowEditSongForm(true)}>Edit Song</button>

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