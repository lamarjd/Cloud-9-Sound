
import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { songs }from "../assets/sample_songs.js"
import { usePlayer } from "../../context/Player.js"
import "./AudioPlayer.css"

// console.log("songs", increase)

const Player = () => {
  // const dispatch = useDispatch();
  // const { playSong, setPlaySong } = usePlayer();

  

  // console.log(usePlayer)
    return (
      
      <div>

      <AudioPlayer
        // className={`${playSong}`} 
        className="audio_player"   
        footer
        src={songs}
        onPlay={e => console.log("onPlay")}
        showJumpControls={false}
        volume="0.2"
        // onClickNext={songs[1]}
        // onClick={() => setPlaySong('on')}
        />

        </div>
        
      
    )
}

export default Player;



           
