import { useState, useContext, createContext, useEffect } from 'react';
import Player from '../components/AudioPlayer/AudioPlayer';

export const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext)

export default function PlayerProvider({children}) {
    const [playSong, setPlaySong] = useState('off')

    return (
        <PlayerContext.Provider
            value={{
                playSong,
                setPlaySong
            }}
        >
            {/* {children} */}
        </PlayerContext.Provider>
    )

}