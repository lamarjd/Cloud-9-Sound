
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
  // const dispatch = useDispatch();
  // const  { url, setUrl }  = usePlayer();
  // console.log("URL Context", url)
  const {songId} = useParams();
  let id = songId

  console.log("SONGID", id);

  const song = useSelector(state => state.songs)

  const playerArr = Object.values(song).map(song => song.url)

  console.log("playerArray", playerArr[3])

  // const nextSong = (playerArr) => {
  //   return playerArr.map(song => {
  //     console.log("song", song)
  //     return song
  //   })
  //   }
  

  // console.log(nextSong())

  // nextSong(songs)

  // console.log(usePlayer)
    return (
      
      <div>

      <AudioPlayer
        className="audio_player"   
        footer
        
        src={playerArr[3]}
        onPlay={e => console.log("onPlay")}
        showJumpControls={false}
        volume="0.2"
        />

        </div>
        
      
    )
}

export default Player;



           
