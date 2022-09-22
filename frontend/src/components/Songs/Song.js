import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import "./Song.css"
import UploadSongForm from "./UploadSongForm"
import SongDetails from "./SongDetails"

import { getSongs } from "../../store/songs.js"

const Song = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => {
        return state.songs
    });
    // console.log("SONG", song)
    
    const songArr = Object.values(song);
    // console.log("SONGARR", songArr)

    const [showForm, setShowForm] = useState(false)



    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    if (!song) {
        return null
    }

    return (
    <div className="container">
        <div className="song_box">
            {songArr.map(({id, title}) => {
                return <div key={id} className="song">
                <NavLink key={song.id} to={`/songs${id}`}>{title}</NavLink></div>             
                })}            
        </div>
        {showForm ? (
            <UploadSongForm hideForm={() => setShowForm(false)} />
        ) : (
            <Route path="./songs/:songId">
                <SongDetails />
            </Route>
        )}
    </div>                    
    )
}

export default Song;