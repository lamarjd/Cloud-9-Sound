'use strict';

const {Playlist} = require('../models')

const playlists = [
  {
    userId: 1,
    name: "Funky Bunch",
    imageUrl: "https://foo.com"
  },
  {
    userId: 2,
    name: "Party Time",
    imageUrl: "https://foo.com"
  },
  {
    userId: 3,
    name: "Time To Cry",
    imageUrl: "https://foo.com"
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

   await Playlist.bulkCreate(playlists)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Playlists')
  },
  playlists
};
