'use strict';
// You are using the bcryptjs package to compare the password and the hashedPassword, so make sure to import the package at the top of the user.js file.
const bcrypt = require('bcryptjs');
const {  Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    };

    // Define a static method getCurrentUserById in the user.js model file that accepts an id. It should use the currentUser scope to return a User with that id.
     static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    };


    // Define a static method login in the user.js model file. It should accept an object with credential and password keys. The method should search for one User with the specified credential (either a username or an email). If a user is found, then the method should validate the password by passing it into the instance's .validatePassword method. If the password is valid, then the method should return the user by using the currentUser scope.
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    //Define a static method signup in the user.js model file that accepts an object with a username, email, and password key. Hash the password using the bcryptjs package's hashSync method. Create a User with the username, email, and hashedPassword. Return the created user using the currentUser scope.
     static async signup({ firstName, lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });

      return await User.scope('currentUser').findByPk(user.id);
    }


    static associate(models) {
      // define association here
      User.hasMany(
        models.Comment, {
          foreignKey: 'userId'
        }
      );
      User.hasMany(
        models.Playlist, {
          foreignKey: 'userId'
        });
      User.hasMany(
        models.Song, {
          foreignKey: 'userId'
        }
      );
      User.hasMany(
        models.Album, {
          foreignKey: 'userId'
        });
        //   User.associate = function(models) {
        //   User.find(models.User, {as: 'Artist', foreignKey: 'userId'})
        // }

    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.')
          }

        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        // duplicate(value) {
        //   if (value) {
        //     const err = new Error("User already exists");
        //     err.message = "User already exists"
        //     err.status = 403
        //   }
        // },
        len: [3, 256],
        isEmail: true
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  },
  {
    sequelize,
    modelName: 'User',
     defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] }
        },
        loginUser: {
          attributes: {}
        }
      }
  });
  return User;
};
