'use strict';

const {Playlist, Song, PlaylistSong} = require('../models')

const playlistToSongs = [
  {
    song: "Here I Am",
    playlist: "Groovy",
    order: 1
  },
  {
    song: "Where Are You?",
    playlist: "Inspiration",
    order: 2
  },
  {
    song: "What Has Happened?",
    playlist: "Sad",
    order: 3
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

  //  for (let songInfo of playlistToSongs) {
  //   const {song, playlist} = songInfo
  //   const findSong = await Song.findOne({where: {song}});
  //   const findPlaylist = await Playlist.findOne({where: {playlist}});
  //   await PlaylistSong.create({
  //     songId: findSong.id,
  //     playlistId: findPlaylist.id
  //   });
  //  }
  await queryInterface.bulkInsert('PlaylistSongs', [
    {
      songId: 1,
      playlistId: 1,
      order: 1
    },
    {
      songId: 2,
      playlistId: 1,
      order: 2
    },
    {
      songId: 3,
      playlistId: 1,
      order: 3
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PlaylistSongs', {}, {})
  },
  // playlistToSongs
};