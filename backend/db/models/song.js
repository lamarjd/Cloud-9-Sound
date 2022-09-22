'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
  
    static associate(models) {
      // define associations here
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
          as: 'Artist',
          foreignKey: 'userId'
        });

    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
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
