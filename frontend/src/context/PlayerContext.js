import { useState, useContext, createContext } from 'react';

export const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export function PlayerProvider({ children }) {
    const [url, setUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const setPlaybackState = (playing) => {
        setIsPlaying(playing);
    };

    const updateCurrentTime = (time) => {
        setCurrentTime(time);
    };

    return (
        <PlayerContext.Provider
            value={{
                url,
                setUrl,
                isPlaying,
                setIsPlaying, // You might want to expose setIsPlaying if needed
                currentTime,
                setPlaybackState,
                updateCurrentTime,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}
