
const LOAD_SONGS = 'songs/LOAD_SONGS'
const EDIT_SONG = 'songs/EDIT_SONG'
const ADD_SONG = ' songs/ADD_SONG'
const DELETE_SONG = 'songs/DELETE_SONG'


const load = list => ({
    type: LOAD_SONGS,
    list
});


// THUNK - get Songs
export const getSongs = () => async dispatch => {
    const response = await fetch(`api/songs`);
    
    if (response.ok) {
        const list = await response.json();
        dispatch(load(list))
    }
};


const initialState = {
    list: []
}

// todo - add to root
const songReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SONGS:
            // console.log("list", list)
            const allSongs = {};
            // action.list.forEach(song => {
            //     allSongs[song.id] = song
            // });
            return {
                ...allSongs,
                ...state,
                list: action.list
            }
        default:
            return state;
    }
}

export default songReducer;