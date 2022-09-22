// Add css


import {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { uploadSong } from "../../store/songs.js"
import './Song.css'

const UploadSongForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('image url')
    const [imageUrl, setImageUrl] = useState('');
    const [albumId, setAlbumId] = useState(null || '')

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateAlbumId = (e) => setAlbumId(e.target.value);

    const song = useSelector(state => state.songs)
    // console.log("song", song)

    useEffect(() => {
        dispatch(uploadSong())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            url,
            imageUrl,
            albumId
        }
        
        let uploadedSong = dispatch(uploadSong(payload));
        
        if (uploadedSong) {
            history.push(`/songs`)
            // history.push(`/songs/${uploadedSong.id}`)
            // hideForm()
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
        <section>
            <form className="upload_song" onSubmit={handleSubmit}>
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
                <button type="submit" onClick={handleSubmit}>Upload Song</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    )
}

export default UploadSongForm;