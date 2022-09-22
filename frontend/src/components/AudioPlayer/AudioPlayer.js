
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { songs }from "../assets/sample_songs.js"

// console.log("songs", increase)

const Player = () => {
  const dispatch = useDispatch();

  

  // console.log(AudioPlayer)
    return (   
      <AudioPlayer    
        footer
        src={songs[0]}
        onPlay={e => console.log("onPlay")}
        onClickNext={songs[1]}
        />
        
      
    )
}

export default Player;



           
