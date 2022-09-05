'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(
        models.User, {
          foreignKey: 'userId'
        });
      Playlist.belongsToMany(
        models.Song, {
          through: models.PlaylistSong,
          foreignKey: 'playlistId'
        });
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      // unique: true
    },
    name: {
      type: DataTypes.STRING,
      // allowNull: false,
      // unique: true,
      // validate: {
      //   len: [2, 25]
      // }
    },
    imageUrl: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   isUrl: true
      // }
    },
  }, {
    sequelize,
    modelName: 'Playlist',
    scopes: {
      userPlaylists(userId) {
        return {
          where: {
            userId: userId
          }
        }
      }
    }
  });
  return Playlist;
};
