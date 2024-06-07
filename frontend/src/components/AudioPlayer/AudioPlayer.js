import AudioPlayer from "react-h5-audio-player";
import { useRef, useEffect } from "react";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../../context/PlayerContext.js";
import "./AudioPlayer.css";

const Player = ({ setProgress }) => {
  const { url, isPlaying, setIsPlaying, currentTime, setCurrentTime } = usePlayer();
  const playerRef = useRef();

  //  Play / Pause the audio player
  useEffect(() => {
    const audio = playerRef.current.audio.current;
    if (isPlaying && url) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, url]);

  // Set the current time of the audio player
  useEffect(() => {
    const audio = playerRef.current.audio.current;
    if (audio && currentTime !== audio.currentTime) {
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

  const handleSeeked = () => {
    const audio = playerRef.current.audio.current;
    const seekTime = audio.currentTime;
    console.log("seekTime", seekTime )

    setCurrentTime(seekTime);
    if (!isPlaying) {
      setIsPlaying(true);
    }
    audio.play();
  };

  // const handleSeeked = () => {
  //    const progressContainer = document.querySelector('.rhap_progress-container')
  //   const timer = progressContainer.getAttribute('aria-valuenow')
  //   // console.log("timer", timer)
  // };

  useEffect(() => {
    const audio = playerRef.current.audio.current;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [setCurrentTime]); 


  // Get the current time of the audio player  
  // useEffect(() => {
  //   const audio = playerRef.current.audio.current;
  //   const progressContainer = document.querySelector('.rhap_progress-container')
  //   // console.log(progressContainer.getAttribute('aria-valuenow'))
  //   const timer = progressContainer.getAttribute('aria-valuenow')

  //   console.log("timer", timer)
  //   audio.currentTime = timer
  //   // timer.setAttribute('aria-valuenow', timer)
  // } )
  

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
        onListen={(e) => {
          setCurrentTime(e.target.currentTime);
        }}
        showJumpControls={false}
        volume="0.5"
      />
    </div>
  );
};

export default Player;
