// This file will hold the resources for the route paths beginning with /api/users. Create and export an Express router from this file.

const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, sequelize, Playlist, PlaylistSong } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');
const Sequelize = require("sequelize");
const playlist = require('../../db/models/playlist');


const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Get all playlists by User Id
router.get('/:userId/playlists', async (req, res) => {
  const {userId} = req.params;

 if (!await User.findByPk(userId)) {
       res.status(404)
      return res.json({
        message: "Artist couldn't be found",
        statusCode: 404
      });
  }

  const userPlaylists = await Playlist.scope([{method: ['userPlaylists', userId]}]).findAll();

  // error handling
  if (!userId) {
    res.status(404);
    res.json({
      message: "Artist couldn't be found",
      statusCode: 404
    })
  }
  /////////////////


  res.json({"Playlists": userPlaylists})

});

// Get all Albums of an Artist from an id
// auth no
router.get('/albums/:albumId', async (req,res) => {

  const {artistId} = req.params

  const artistAlbums = await User.findByPk(artistId, {
    include: [{model:Song,
      attributes: ['id','username','imageUrl']
    },
    {model: Album,
      attributes: ['id','title','imageUrl']}
    ],
  })
  if(!artistAlbums){
      res.status(404)
      return res.json({
        message: "Song couldn't be found",
        statusCode: 404
      })
    }
  return res.json({"Albums": artistAlbums})
})



// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const {userId} = req.user.id
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

  if (await User.findAll({where: { email: email}})){
    res.status(403);
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists"
      }
    })
  }
  if (await User.findAll({where: { username: username}})){
    res.status(403);
    return  res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that username already exists"
      }
    })
  }

  if (!(user.email || user.username || user.firstName || user.lastName)) {
    res.status(400);
    res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        email: "Invalid email",
        username: "Username is required",
        firstName: "First Name is required",
        lastName: "Last Name is required"
      }
    })
  }

  return res.json(
    user
    );
  }
);

router.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

module.exports = router;
