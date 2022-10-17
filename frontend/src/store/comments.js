import { csrfFetch } from "./csrf";



const CREATE_COMMENT = "comments/CREATE_COMMENT"
const GET_COMMENTS = "comments/GET_COMMENTS"
const REMOVE_COMMENT = "comments/REMOVE_COMMENT"

/* ACTIONS */
const add = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

const allComments = (comments) => {
    return {
        type: GET_COMMENTS,
        comments
    }
}

const remove = (commentId, songId) => {
    return {
        type: REMOVE_COMMENT,
        commentId,
        songId
    }
}


// THUNK - DELETE COMMENT
export const deleteComment = (commentId, songId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const {id: deletedCommentId } = await response.json();
        dispatch(remove(deletedCommentId, songId));
        return deletedCommentId;
    }
}

// THUNK - get comments
export const getComments = (songId) => async dispatch => {
    const response = await csrfFetch (`/api/songs/${songId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(allComments(comments))
    }
};


export const createComment = (songId, comment) => async (dispatch) => {
    console.log("CREATING A COMMENT THUNK DISPATCHING", songId.songId)
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });
    console.log("RESPONSE", response)
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

const commentReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_COMMENTS:
            const allComments = {}
            action.comments.Comments.forEach((comment) => (allComments[comment.id] = comment))
            return allComments;
        case CREATE_COMMENT:
            if (!state[action.comment.id]) {
                console.log("new State: BEFORE", newState)
                newState = {
                    ...state,
                    [action.comment.id]: action.comment
                }
                console.log("new State: AFTER", newState)
                return newState
            }
            return {
                ...state, 
                [action.comment.id]: {
                    ...state[action.comment.id],
                    ...action.comment
                }
            };
        case REMOVE_COMMENT:
            newState = {...state};
            delete newState[action.comment.id]
            return newState;
        default:
            return state;
        }
    }

export default commentReducer;