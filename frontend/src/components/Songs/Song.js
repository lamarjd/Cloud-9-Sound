import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getSongs } from "../../store/songs.js"

const Song = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => {
        return state.songs.list.Songs.map(song => song.title);
        // console.log("wtf", state.songs.list.Songs.map(song => {
        //     return song.title
        // }))

    });
    
    console.log("SONG", song)

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    if (!song) {
        return null
    }

    return (
        <main>
            <NavLink key={song.title} to={`/songs${song.id}`}>
                    <div>
                        <ul>
                            <li>
                            {song[0]}
                            </li>
                            <li>
                            {song[1]}
                            </li>
                            <li>
                            {song[2]}
                            </li>
                        </ul>
                    </div>
            </NavLink>
                
            
        </main>
    )



}

export default Song;