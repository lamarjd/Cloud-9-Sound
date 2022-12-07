'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    options.tableName = ''; 

   await Playlist.bulkCreate(options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = ''; 
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  },
  playlists
};
