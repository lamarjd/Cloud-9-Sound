import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
// import useDispatch for use
import { useSelector, useDispatch } from 'react-redux';
// import the thunk
import { getOneSong } from "../../store/songs.js"
import EditSongForm from "./EditSongForm"

const SongDetails = ({hideForm}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    const song = useSelector(state => state.songs[songId]);
    console.log("song Selector", song)

    const [editSongForm, setEditSongForm] = useState(false);
    const [editSongId, setEditSongId] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('image url')
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(null || '')

    
    useEffect(() => {
        setEditSongForm(false)
        setEditSongId(null)
        dispatch(getOneSong(songId))
    }, [dispatch, songId])

    let content = null;

    if (editSongId) {
        content = (
            <EditSongForm 
            songId={editSongId}
            visibility={true}
            hideForm={() => setEditSongForm(null)}
            />
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // <EditSongForm 
        // visibility={true}
        // />

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId
        }
        
        let editedSong = dispatch(editedSong(payload));
        
        if (editedSong) {
            history.push(`/songs`)
            history.push(`/songs/${editedSong.id}`)
            hideForm()
        }
    };

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
                <button type="submit">Edit Song</button>
                {/* <EditSongForm /> */}
            </div>
        </div>
    )

}

export default SongDetails;