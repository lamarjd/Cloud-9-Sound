import AudioPlayer from "react-h5-audio-player";
import {useRef, useEffect} from "react";
import { useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/PlayerContext.js";
import "./AudioPlayer.css";

const Player = () => {
  const { url, setUrl, isPlaying, setIsPlaying } = usePlayer();
  const playerRef = useRef();
  // console.log("PLayer playing state", isPlaying);
  
  useEffect(() => {
    const audio = playerRef.current.audio.current;
    if (isPlaying && url) {
      audio.play();
    } else {
      setIsPlaying(false);
      audio.pause();
    }    
  }, [isPlaying, url]);


  

  return (
    <div>
      <AudioPlayer
        className="audio_player"
        footer
        src={url}
        ref={playerRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        showJumpControls={false}
        volume="0.5"
      />
    </div>
  );
};

export default Player;
