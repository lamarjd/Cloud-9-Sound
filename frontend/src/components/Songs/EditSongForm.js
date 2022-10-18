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

const EditSongForm = ({ song, setShowEditSongForm }) => {

    console.log("SONG FROM EDITSONG", song)
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
        setTitle(song && song.title)
        setDescription(song && song.description)
        setUrl(song && song.url)
        setImageUrl(song && song.imageUrl)
        setAlbumId(song && song.albumId)
    }, [song])


    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = [];

        if (title.length < 3) {
            validationErrors.push("Song title must be longer than 3 characters")
        }

        if (description.length < 4) {
            validationErrors.push("Song Description must be longer than 4 characters")
        }

        if (!imageUrl.includes('.jpg')) {
            validationErrors.push("Song Image must be in the proper format (.png)")
        }

        if (!url.includes('.mp3')) {
            validationErrors.push("Please provide a valid song url (.mp3)") 
        }

        setErrors(validationErrors)

        const payload = {
            id,
            title,
            description,
            url,
            imageUrl,
            albumId
        }
        
        if (validationErrors.length) return null;

        let editedSong = await dispatch(editSong(payload));
        
        if (editedSong) {
            // history.push(`/songs/${songId}`)
            // console.log("Edited Song", editedSong)
            setShowEditSongForm(false)
            history.push(`/songs/${editedSong.id}`)
            // hideForm()
        } 

    };

    const handleCancelClick = (e) => {
        e.preventDefault();
       
        setShowEditSongForm(false)
        // hideForm();
        // setShowEditSongForm(!showEditSongForm);
        // console.log("song Id", song.id)
        history.push(`/songs/${songId}`)
    }

    return (
        <section>
            <ul>

            {errors && 
                errors.map(error => {
                   return <li className="errors" key={error}>{error}</li>
                })
            }

            </ul>


            <form className="edit_song" onSubmit={handleSubmit}>
                <div className="edit_field_name" >Title</div>
                <input 
                type="text"
                // placeholder={song.title}
                required
                value={title}
                onChange={updateTitle}             
                />
                <div className="edit_field_name" >Description</div>
                <input 
                type="text"
                // placeholder={song.description}
                min="2"
                max="250"
                required
                value={description}
                onChange={updateDescription}                
                />
                <div className="edit_field_name" >URL</div>
                <input 
                type="text"
                // placeholder={song.url}
                required
                value={url}
                onChange={updateUrl}
                />
                <div className="edit_field_name" >Image Url</div>
                <input 
                type="text"
                // placeholder={song.imageUrl}
                value={imageUrl}
                onChange={updateImageUrl}
                />
                <div className="edit_field_name" >Album ID</div>
                <input 
                type="text"
                // placeholder={song.albumId || "Album Id"}
                value={albumId || ''}
                onChange={updateAlbumId}
                /> <br/>
                <button type="submit" onClick={handleSubmit}>Save Changes</button>
                <button type="reset" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default EditSongForm;

