
import { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import { songs }from "../assets/sample_songs.js"
import { usePlayer } from "../../context/PlayerContext.js"
import "./AudioPlayer.css"
import { useParams } from "react-router-dom"

// console.log("songs", increase)

const Player = () => {

  const  { url, setUrl }  = usePlayer();

  // console.log(url)
  
    return (
      
      <div>

      <AudioPlayer
        className="audio_player"   
        footer
        
        src={url}
        onPlay={e => console.log("onPlay")}
        showJumpControls={false}
        volume="0.2"
        />

        </div>
        
      
    )
}

export default Player;



           
