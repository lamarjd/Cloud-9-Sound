import AudioPlayer from "react-h5-audio-player";
import {useRef, useEffect} from "react";
import { useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/PlayerContext.js";
import "./AudioPlayer.css";

const Player = () => {
  const { url } = usePlayer();
  const playerRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = playerRef.current.audio.current;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  

  return (
    <div>
      <AudioPlayer
        className="audio_player"
        footer
        src={url}
        ref={playerRef}
        onPlay={(e) => console.log("onPlay")}
        onPause={(e) => console.log("onPause")}
        showJumpControls={false}
        volume="0.2"
      />
    </div>
  );
};

export default Player;
