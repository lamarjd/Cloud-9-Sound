import AudioPlayer from "react-h5-audio-player";
import { useRef, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/PlayerContext.js";
import "./AudioPlayer.css";

const Player = ({ setProgress, currentTime, setCurrentTime }) => {
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
    const audio = playerRef.current.audio.current;
    if (audio) {
      audio.currentTime = currentTime;
    }
  }, [currentTime]);

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

    const handleSeeked = (e) => {
    const audio = playerRef.current.audio.current;
    audio.currentTime = e.target.currentTime;
    if (isPlaying) {
      audio.play();
    }
  };
  
  // Get the current time of the audio player  
  // useEffect((e) => {

  //   const progressContainer = document.querySelector('.rhap_progress-container')
  //   // console.log(progressContainer.getAttribute('aria-valuenow'))
  //   const timer = progressContainer.getAttribute('aria-valuenow')
  //   console.log("timer", timer)
  //   // timer.setAttribute('aria-valuenow', timer)
  // })
  

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
        onSeeked={handleSeeked}
        showJumpControls={false}
        volume="0.5"
      />
    </div>
  );
};

export default Player;
