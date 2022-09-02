'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(
        models.User, {
          foreignKey: 'userId'
        }
      );
      Comment.belongsTo(
        models.Song, {
          foreignKey: 'songId'
        }
      );
    }
  }
  Comment.init({
    songId: {
     type: DataTypes.INTEGER,
     allowNull: false,
    },
    userId: {
     type: DataTypes.INTEGER,
     allowNull: false,
    },
    body: {
     type: DataTypes.STRING,
     allowNull: false,
    //  validate: {
      // len: [1, 100]
    //  }
    },
  }, {
    sequelize,
    modelName: 'Comment',
     defaultScope: {
      attributes: {
        include: ["userId", "songId", "body", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        songComment(songId) {
          const { User } = require('../models')
          return {
            where: {
              songId: songId,
            },
            include: {
            model: User,
            attributes: ['id', 'username']
            }
          }
        }
      }
  });
  return Comment;
};
