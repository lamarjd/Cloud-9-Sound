import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import useDispatch for use
import { useSelector, useDispatch } from 'react-redux';
// import the thunk
import { getOneSong } from "../../store/songs.js"

const SongDetails = () => {
    const dispatch = useDispatch();
    const {songId} = useParams();
    const song = useSelector(state => state.song[songId]);
    console.log("song Selector", song)

    const [editSongForm, setEditSongForm] = useState(false);
    const [editSongId, setEditSongId] = useState(null);

    // todo: useffect, JSX


}

export default SongDetails;