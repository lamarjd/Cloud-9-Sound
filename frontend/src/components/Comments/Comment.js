import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, Switch } from 'react-router-dom';

// import { allComments } from "../../store/comments.js"

const Comment = ({ songId }) => {
    console.log(songId)

    return (
        <div>Hello from Comment</div>
    )
}

export default Comment;