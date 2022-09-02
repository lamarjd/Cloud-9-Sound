'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(
        models.Comment, {
          foreignKey: 'songId'
        });
      Song.belongsToMany(
        models.Playlist, {
          through: models.PlaylistSong,
          foreignKey: 'songId'
        });
      Song.belongsTo(
        models.Album, {
          foreignKey: 'albumId'
        });
      Song.belongsTo(
        models.User, {
          foreignKey: 'userId'
        });
    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        // checker(value) {
        //   if (!value) {
        //     throw new Error("Song title is required")
        //   }
        // },
        len: [2, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 250]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
    //     check(value) {
    //       if (!value) {
    //         throw new Error("Audio is required")
    //       }
    //     }
    //   }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isUrl: true
      // }
    },
  }, {
    sequelize,
    modelName: 'Song',
    scopes: {
      comment: {
        attributes: {exclude: ["albumId", "title", "description", "url" ]}
      },
      artistSongs(userId) {
        // const { User } = require('../models');
        return {
          where: {
            userId: userId
          },
        }
      }
      },
  });
  return Song;
};
