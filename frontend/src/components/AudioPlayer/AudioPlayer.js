import AudioPlayer from "react-h5-audio-player";
import { useRef, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/PlayerContext.js";
import "./AudioPlayer.css";

const Player = ({ setProgress }) => {
  const { url, isPlaying, setIsPlaying } = usePlayer();
  const playerRef = useRef();
  

  useEffect(() => {
    const audio = playerRef.current.audio.current;
    if (isPlaying && url) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, url]);

  useEffect(() => {
    const progressContainer = document.querySelector('.rhap_progress-container');
    if (progressContainer) {
      const observer = new MutationObserver(() => {
        const progressValue = progressContainer.getAttribute('aria-valuenow');
        setProgress(progressValue);
      });

      observer.observe(progressContainer, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [setProgress]);

  return (
    <div>
      <AudioPlayer
        className="audio_player"
        src={url}
        ref={playerRef}
        onPlay={() => {
          if (!isPlaying) setIsPlaying(true);
        }}
        onPause={() => {
          if (isPlaying) setIsPlaying(false);
        }}
        showJumpControls={false}
        volume="0.5"
      />
    </div>
  );
};

export default Player;
