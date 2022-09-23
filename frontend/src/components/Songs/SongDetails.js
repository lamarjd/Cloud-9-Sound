import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import useDispatch for use
import { useSelector, useDispatch } from 'react-redux';
// import the thunk
import { getOneSong } from "../../store/songs.js"
import EditSongForm from "./EditSongForm"

const SongDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    const song = useSelector((state) => {
        // if (!song) return null;
        return state.songs[songId]});
    console.log("song Selector", song)

    const [showEditSongForm, setShowEditSongForm] = useState(false);
    const [editSongId, setEditSongId] = useState(null);

    // const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');
    // const [url, setUrl] = useState('image url')
    // const [imageUrl, setImageUrl] = useState('');
    // const [albumId, setAlbumId] = useState(null || '')

    
    useEffect(() => {
        setShowEditSongForm(false)
        setEditSongId(null)
        dispatch(getOneSong(songId))
    }, [dispatch, songId])

    if (!song) {
        alert("No song hombre");
    }

    let content = null;

    if (showEditSongForm) {
        content = (
            <EditSongForm 
            songId={editSongId}
            song={song}
            // visibility={true}
            onClick={() => setShowEditSongForm(false)}
            />
        );
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // <EditSongForm 
    //     // visibility={true}
    //     // />

    //     const payload = {
    //         title,
    //         description,
    //         url,
    //         imageUrl,
    //         albumId
    //     }
        
    //     let editedSong = dispatch(editedSong(payload));
        
    //     if (editedSong) {
    //         history.push(`/songs`)
    //         // history.push(`/songs/${editedSong.id}`)
    //         hideForm()
    //     }
    // };

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
                {( !showEditSongForm ) && (

                    <button onClick={() => setShowEditSongForm(true)}>Edit Song
                    </button>
                )}
                {/* render the EditSongForm */}
                {content}
            </div>
        </div>
    )

}

export default SongDetails;