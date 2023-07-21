import { csrfFetch } from "./csrf";


const LOAD_SONGS = 'songs/LOAD_SONGS'
const EDIT_SONG = 'songs/EDIT_SONG'
const ADD_SONG = ' songs/ADD_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'
const SEARCH_SONG = 'songs/SEARCH_SONG'

// ACTION CREATOR =====================
const search = (songs) => {
    return {
        type: SEARCH_SONG,
        songs
    }
}

const load = (songs) => {
    return {
        type: LOAD_SONGS,
        songs
    }
};

const addSong = (song) => {
    return {
        type: ADD_SONG,
        song
    }
}

const edit = (song) => {
    return {
        type: EDIT_SONG,
        song
    }
};

const remove = (songId) => {
    return {
        type: DELETE_SONG,
        songId
    }
}

// ================================

// THUNK ACTIONS ==================

export const getFilteredSong = (searchQuery) => async dispatch => {
    const response = await csrfFetch(`/api/songs?search=${encodeURIComponent(searchQuery)}`);

    if (response.ok) {
        const filtered = await response.json();
        dispatch(search(filtered))

    }
}

export const getSongs = () => async dispatch => {
    const response = await csrfFetch(`/api/songs`);
    
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list))
    }
};

export const getOneSong = (id) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${id}`)
    if (response.ok) {
        const song = await response.json();
        dispatch(addSong(song));
        return song
    }
    alert("getOneSong not found")
}

// THUNK - post a Song
export const uploadSong = (data) => async dispatch => {
    const response = await csrfFetch('/api/songs', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const upload = await response.json();
        dispatch(getSongs(data))
        return upload;
    }
    //error handling
    throw new Error ("cannot load")
}

// THUNK - Edit song
export const editSong = (song) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(song)
    });
    if (response.ok) {
        const song = await response.json();
        dispatch(edit(song))
        return song
    }
    // error handling
    return null;
}

// THUNK - Delete a Song
export const deleteSong = (songId) => async dispatch => {
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
        });
    if (response.ok) {
        const song = `${songId}`
        dispatch(remove(song));       
    }
}

// ================================


// REDUCER
const initialState = {}

const songReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_SONGS:
            // newState = Object.assign({}, state, {songs: action.songs});
            // return newState
            // console.log("action", action)
            const allSongs = {}
            action.songs.Songs.forEach((song) => (allSongs[song.id] = song))
            // console.log("Allsongs", allSongs)
            return allSongs
        case ADD_SONG:
            if (!state[action.song.id]) {
                newState = {
                    ...state,
                    [action.song.id]: action.song
                }
                return newState                
            }
        return {
            ...state,
            [action.song.id]: {
                ...state[action.song.id],
                ...action.song
            }        
        };
        case EDIT_SONG:
            return {
                ...state,
                [action.song.id]: action.song
            }
        case DELETE_SONG:
            newState = {...state}
            delete newState[action.songId]
            return newState;
            case SEARCH_SONG:
                console.log("Searching for song")
                const filteredSongs = {}
                // Here we are storing the song title based on its id
                action.songs.Songs.forEach((song) => (filteredSongs[song.id] = song.title)) 
                console.log("Is this the song?", filteredSongs)
                return filteredSongs
        default:
            return state;

    }
}

export default songReducer;