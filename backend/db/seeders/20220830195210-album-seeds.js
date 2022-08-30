'use strict';

const {Album} = require('../models')

const albums = [
  {
    userId: 1,
    title: "Hard Knocks",
    description: "Album about life",
    imageUrl: "https://foo.com",
  },
  {
    userId: 2,
    title: "Lost In Space",
    description: "Album about finding yourself",
    imageUrl: "https://foo.com",
  },
  {
    userId: 3,
    title: "Throw Yourself Away",
    description: "This album is all about self reflection and righting your wrongs",
    imageUrl: "https://foo.com",
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Album.bulkCreate(albums)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await Album.bulkDelete(albums)
  },
  albums
};
