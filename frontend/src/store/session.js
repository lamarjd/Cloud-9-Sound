/* DEV NOTES
This file will contain all the actions specific to the session user's information and the session user's Redux reducer.
*/
import { csrfFetch } from './csrf';

const SET_USER = 'session/SET_USER'
const REMOVE_USER = 'session/REMOVE_USER'

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

// THUNK -Logout
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeUser());
    return response;
  };

// THUNK - Signup
export const signup = (user) => async (dispatch) => {
    // deconstruct the user object into desired fields needed for signup
    const {username, email, password, firstName, lastName} = user;
    const response = await csrfFetch("api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            password,
            firstName,
            lastName
        })
    });
    const data = await response.json();
    // console.log("signup" , data)
    dispatch(setUser(data))
    return response
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    // console.log("restoreUser", data)
    dispatch(setUser(data));
    return response;
};


// THUNK - call the API to login, then set the session user from the response
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
      method: 'POST',
      body: JSON.stringify({
        credential,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data));
    return response;
  };

const initialState = {user: null}

// REDUCER
function sessionReducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        
        default:
            return state
    }
}

export default sessionReducer