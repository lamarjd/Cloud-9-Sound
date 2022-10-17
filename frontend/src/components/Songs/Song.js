import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, Switch } from 'react-router-dom';
import "./Song.css"
import UploadSongForm from "./UploadSongForm"
import SongDetails from "./SongDetails"

import { getSongs } from "../../store/songs.js"


const Song = ({songs}) => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => {
        return state.songs
    });
    // console.log("SONG", song)

    const [showUploadForm, setShowUploadForm] = useState(false)
    
    const songArr = Object.values(song);
    // console.log("SONGARR", songArr)

    // const [showForm, setShowForm] = useState(false)



    useEffect(() => {
        setShowUploadForm(false)
        dispatch(getSongs())
    }, [dispatch])

    if (!song) {
        return null
    }

    let content =  <UploadSongForm 
    songId={songId}
    onClick={() => setShowUploadForm(false)}
    />

    // if (showUploadForm) {
    //     content = (
    //         <UploadSongForm 
    //         songId={songId}
    //         onClick={() => setShowUploadForm(false)}
    //         />
    //     )
    // }

    return (
    <div className="container">
        {( !showUploadForm && 

            <div className="song_list">
                {/* Library Song list page */}
                {songArr.map(({id, title, imageUrl}) => {
                    return <div key={id} className="song">
                    <NavLink className="song-link" key={song.id} to={`/songs/${id}`}><img src={imageUrl} />{title}</NavLink></div>             
                })}            
            </div>

         )}
            <div>{content}</div>
        


            
           
                {/* <UploadSongForm onClick={() => setShowUploadForm(false)} /> */}
            
            
 
            <>
            <Route exact path="/songs/:songId">
                <SongDetails />
            {/* {console.log("I'm the content: ", content)} */}
            </Route>
            </>
         
    </div>                    
    )
}

export default Song;