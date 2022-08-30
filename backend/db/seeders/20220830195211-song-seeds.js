'use strict';

const {Song} = require('../models')


const songs = [
  {
    albumId: 1,
    userId: 1,
    title: "Here I Am",
    description: "Groovy tune about my life",
    url: "foo.com",
    imageUrl: "foo.com"
  },
  {
    albumId: 2,
    userId: 2,
    title: "Where Are You?",
    description: "Inspiring song about finding yourself",
    url: "foo.com",
    imageUrl: "foo.com"
  },
  {
    albumId: 3,
    userId: 3,
    title: "What Has Happened?",
    description: "Sad song about where things went wrong",
    url: "foo.com",
    imageUrl: "foo.com"
  },
]


module.exports = {
  async up (queryInterface, Sequelize) {

   await queryInterface.bulkInsert('Songs', songs)
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Songs', songs)
  },
  // songs
};
