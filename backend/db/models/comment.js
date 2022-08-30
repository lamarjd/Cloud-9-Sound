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
      Comment.hasMany(
        models.User, {
          foreignKey: 'userId'
        }
      );
      Comment.hasMany(
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
  });
  return Comment;
};
