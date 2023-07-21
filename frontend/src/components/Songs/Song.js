import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Route, useParams, Switch } from "react-router-dom";
import "./Song.css";
// import "./SongTest.css";
// import UploadSongForm from "./UploadSongForm"
import SongDetails from "./SongDetails";

import { getSongs, getFilteredSong } from "../../store/songs.js";


const Song = ({ songs }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => {
    return state.songs;
  });
  // console.log("SONG", song)

  const [showUploadForm, setShowUploadForm] = useState(false);

  const songArr = Object.values(song);
  // console.log("SONGARR", songArr)

  // SEARCH
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      dispatch(getFilteredSong(searchQuery))
      // setFilteredSongs(filteredSongs);
    } catch (error) {
      console.error('Error fetching filtered songs:', error);
    }
  };

  useEffect(() => {
    setShowUploadForm(false);
    dispatch(getSongs());
  }, [dispatch]);

  if (!song) {
    return null;
  }

  return (
    <div className="container">
      {/* <h3> Here's what's trending</h3>  */}
      {!showUploadForm && (
        <div className="song_list">

          {/* Add the search bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for songs..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {/* Display the filtered songs */}
        <div className="song-list">
          {filteredSongs.map((song) => (
            <div key={song.id}>{song.title}</div>
          ))}
        </div>

          {/* Library Song list page */}
          {songArr.map(({ id, title, imageUrl }) => {
            return (
              <div key={id} className="song">
                <NavLink
                  className="song-link"
                  key={song.id}
                  to={`/songs/${id}`}
                >
                  <img src={imageUrl} />
                  <br />
                  {title}
                </NavLink>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  filteredSongs: state.filteredSongs,
});

export default Song;