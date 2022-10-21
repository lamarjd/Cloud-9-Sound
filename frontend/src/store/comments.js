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

const remove = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId,
    }
}


// THUNK - DELETE COMMENT
export const deleteComment = (commentId) => async dispatch =>
{
    // console.log("COMMENTID from the delete thunk", commentId)
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    // console.log("DELETE COMMENT RESPONSE", response)
    if (response.ok) {
        const message = await response.json();
        dispatch(remove(commentId));
        return message;
    }
    alert("Wanting to delete but can't")
}

// THUNK - get comments
export const getComments = (songId) => async dispatch => {
    // console.log("SongId from getComments thunk", songId);
    const response = await fetch(`/api/songs/${songId}/comments`);
    // console.log("Response from getComments thunk", response)

    if (response.ok) {
        const comments = await response.json();
        // console.log("Comment from the getComments thunk", comments)
        dispatch(allComments(comments))
    } 
    // else {
    //     alert("can't get comments")
    // }
};


export const createComment = (songId, comment) => async (dispatch) => {
    // console.log("CREATING A COMMENT THUNK DISPATCHING", songId.songId)
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    });
    // console.log("RESPONSE", response)
    if (response.ok) {
        const upload = await response.json();
        // console.log("This is the new comment from Thunk", upload)
        dispatch(add(upload))
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
            // console.log("Action.comments from reducer", action.comments)
            action.comments.Comments.forEach((comment) => (allComments[comment.id] = comment))
            // console.log("all comments from reducer", allComments)
            return allComments;
        case CREATE_COMMENT:
            const addState = {...state}
            addState[action.comment.id] = action.comment
            return addState;         
        case REMOVE_COMMENT:
            const removeState = {...state};
            delete removeState[action.commentId]
            // console.log("Remove state from reducer", removeState)
            return removeState;
        default:
            return state;
        }
    }

export default commentReducer;