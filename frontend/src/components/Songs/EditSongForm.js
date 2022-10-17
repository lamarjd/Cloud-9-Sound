import {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams  } from 'react-router-dom'
import { editSong } from "../../store/songs.js"
import './Song.css'
import { getSongs } from "../../store/songs.js"




/* TODO: 
-  validate user owns song
- css
- positioning (Modal?)
*/

const EditSongForm = ({ song }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { songId }  = useParams();

    let id = songId
    // console.log("ID", id)
    const sessionUser = useSelector(state => state.session.user);
    // console.log("SESSION USER", sessionUser)

    // const showEdit = useSelector(state => state.songs)
    // console.log("Show Edit Form", showEdit)

    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(null || '')
    const [errors, setErrors] = useState([])

    // const [showEditSongForm, setShowEditSongForm] = useState(false);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateAlbumId = (e) => setAlbumId(e.target.value);

    if (!sessionUser) {
        alert("You're not authorized")
    }


    useEffect(() => {
        let validationErrors = [];


        dispatch(getSongs())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            title,
            description,
            url,
            imageUrl,
            albumId
        }
        
        let editedSong = await dispatch(editSong(payload));
        
        if (editedSong) {
            // history.push(`/songs`)
            history.push(`/songs/${editedSong.id}`)
            // hideForm()
        } 

    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        // hideForm();
        // setShowEditSongForm(!showEditSongForm);
        history.push(`/songs/${songId}`)
    }

    return (
        <section>
            <form className="edit_song" onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="title"
                required
                value={title}
                onChange={updateTitle}             
                />
                <input 
                type="text"
                placeholder="description"
                min="2"
                max="250"
                required
                value={description}
                onChange={updateDescription}                
                />
                <input 
                type="text"
                placeholder="url"
                required
                value={url}
                onChange={updateUrl}
                />
                <input 
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={updateImageUrl}
                />
                <input 
                type="text"
                placeholder="Album ID"
                value={albumId}
                onChange={updateAlbumId}
                />
                <button type="submit" onClick={handleSubmit}>Save Changes</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default EditSongForm;

