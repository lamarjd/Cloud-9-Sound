store = {
  session: {},
  songs: {
    allSongs: {
      [songId]: {
        songData,
      },
      optionalOrderedList: [],
    },
    singleSong: {
      songData,
      Artist: {
        artistData,
      },
      // Not a required feature for first 2 CRUD features
      Album: {},
    },
  },
  playlists: {
    allPlaylists: {
      [playlistId] : {
        playlistData
      },
      optionalOrderedList: [],
    },
    singlePlaylist: {
      playlistData,
      Songs : {
        songsData
      }
    }
  },
  // You will want some slice of state to keep track of the song being played
  // and to keep track of playlist/album for continuous play.
  songPlayer: {
    currentSong: { songData }
    currentPlaylist: {
      playlistData,
      Songs : {
        songsData
      }
    }
  },
};