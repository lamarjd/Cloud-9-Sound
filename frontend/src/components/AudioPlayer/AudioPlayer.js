import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/PlayerContext.js";
import "./AudioPlayer.css";

const Player = () => {
  const { url } = usePlayer();

  return (
    <div>
      <AudioPlayer
        className="audio_player"
        footer
        src={url}
        onPlay={(e) => console.log("onPlay")}
        onPause={(e) => console.log("onPause")}
        showJumpControls={false}
        volume="0.2"
      />
    </div>
  );
};

export default Player;
