import { useState, useContext, createContext, useEffect } from 'react';


export const PlayerContext = createContext();
export const usePlayer = () => useContext(PlayerContext)

export function PlayerProvider(props) {
    const [playSong, setPlaySong] = useState('off')
    const [url, setUrl] = useState('')


    return (
        <PlayerContext.Provider
            value={{
                // possibly delete
                playSong,
                // possibly delete
                setPlaySong,
                url,
                setUrl
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    )

}