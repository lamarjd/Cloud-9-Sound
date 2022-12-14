'use strict';



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Songs',
        //   through: {
        //     model: 'PlaylistSongs',
        //     key: 'id'
        //   }
        // }
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // unique: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        // allowNull: false,
        // unique: true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Playlists');
  }
};
