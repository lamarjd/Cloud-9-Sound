
const LOAD_COMMENTS = "songs/:songId/LOAD_COMMENTS"

/* ACTIONS */

const load = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

/* THUNKS */
export const getComments = () => async dispatch => {
    const response = await fetch (`/api/songs/:songId/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(load(comments))
    }
};


/* REDUCER */
const initialState = {};

const commentReducer = (state= initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_COMMENTS:
            const allComments = {}
            action.comments.Comments.forEach((comment) => (allComments[comment.id] = comment))
    }
}

export default commentReducer;