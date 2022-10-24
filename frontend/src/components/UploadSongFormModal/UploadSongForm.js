import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { uploadSong } from "../../store/songs.js";
import "./UploadSongForm.css";
import logo from "../assets/images/CLOUD9Logo.png";

const UploadSongForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [albumId, setAlbumId] = useState(null || "");
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateAlbumId = (e) => setAlbumId(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = [];

    if (title.length < 3) {
      validationErrors.push("Song title must be longer than 3 characters");
    }

    if (description.length < 4) {
      validationErrors.push(
        "Song Description must be longer than 4 characters"
      );
    }

    if (!imageUrl.includes(".jpg" || ".png")) {
      validationErrors.push(
        "Song Image must be in the proper format (.jpg or .png)"
      );
    }

    if (!url.includes(".mp3")) {
      validationErrors.push("Please provide a valid song url (.mp3)");
    }

    if (!albumId) {
      validationErrors.push("Please provide an Album ID");
    }

    setErrors(validationErrors);

    const payload = {
      title,
      description,
      url,
      imageUrl,
      albumId,
    };

    if (validationErrors.length) return null;

    let uploadedSong = await dispatch(uploadSong(payload));

    if (uploadedSong) {
      setShowModal(false);
      history.push(`/`);
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <section>
      <form className="upload_song_form" onSubmit={handleSubmit}>
        <ul>
          {errors &&
            errors.map((error) => {
              return (
                <li className="errors" key={error}>
                  {error}
                </li>
              );
            })}
        </ul>
        <h2>Let's get started!</h2>
        <h4>Upload your song and share it with the community</h4>
        <div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
        </div>{" "}
        <br />
        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
        </label>
        <br />
        <label>
          Description
          <input
            type="text"
            placeholder="Description"
            min="2"
            max="250"
            required
            value={description}
            onChange={updateDescription}
          />
        </label>
        <br />
        <label>
          Song URL
          <input
            type="text"
            placeholder="URL (.mp3 format)"
            required
            value={url}
            onChange={updateUrl}
          />
        </label>
        <br />
        <label>
          Image Url
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={updateImageUrl}
          />
        </label>
        <br />
        <label>
          Album ID
          <input
            type="text"
            placeholder="Album ID (optional)"
            value={albumId}
            onChange={updateAlbumId}
          />
        </label>
        <br />
        <span className="buttons">
          <button type="button" onClick={handleSubmit}>
            Upload
          </button>

          <button type="reset" onClick={handleCancelClick}>
            Cancel
          </button>
        </span>
      </form>
    </section>
  );
};

export default UploadSongForm;
