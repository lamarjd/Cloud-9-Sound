import { csrfFetch } from "./csrf";
import { load } from "./songs"


const CREATE_COMMENT = "comments/CREATE_COMMENT"
const GET_COMMENTS = "comments/GET_COMMENTS"

/* ACTIONS */

const add = (comments) => {
    return {
        type: CREATE_COMMENT,
        comments
    }
}

const allComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

// THUNKS
export const getComments = (songId) => async dispatch => {
    const response = await csrfFetch (`/api/songs/${songId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(allComments(comments))
    }
};


export const createComment = (songId, comment) => async (dispatch) => {
    // console.log("CREATING A COMMENT THUNK DISPATCHING")
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const upload = await response.json();
        dispatch(add(comment))
        return upload;
    }
    // error handle
    alert("Error with posting comment thunk")

}




/* REDUCER */
const initialState = {};

const commentReducer = (state= initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_COMMENTS:
            const allComments = {}
            action.comments.Comments.forEach((comment) => (allComments[comment.id] = comment))
            return allComments;
        case CREATE_COMMENT:
            if (!state[action.comment.id]) {
                newState = {
                    ...state,
                    [action.comment.id]: action.comment
                }
                return newState
            }
            return {
                ...state, 
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            };
        default:
            return state;
        }
    }

export default commentReducer;