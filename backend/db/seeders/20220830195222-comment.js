'use strict';

const {Comment} = require('../models')

const comments = [
  {
    songId: 1,
    userId: 1,
    body: "Great song!",
  },
  {
    songId: 1,
    userId: 2,
    body: "Wow amazing!",
  },
  {
    songId: 1,
    userId: 3,
    body: "Anybody can make this",
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
   await queryInterface.bulkInsert('Comments', comments)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Comments', comments)
  },
  // comments
};
