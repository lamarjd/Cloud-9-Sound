// This file will hold the resources for the route paths beginning with /api/users. Create and export an Express router from this file.

const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, sequelize, Playlist } = require('../../db/models');

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

  const userPlaylists = await Playlist.scope([{method: ['userPlaylists', userId]}]).findAll();

  // error handling
  if (!userPlaylists.userId) {
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

// Get details of an Artist from an id
router.get('/:artistId', async (req, res) => {
  const userId = req.user.id
  const {artistId} = req.params
  // const {imageUrl} = req.query



  const songs = await Song.count({where: userId})

  const albums = await Album.count({where: userId})


  const details = await User.findByPk(artistId, {
      // attributes: ['id', 'username', 'imageUrl'],
    where: {
      artistId: artistId,
    }
    });


    if (!details) {
      res.status(404);
      res.json({
        message: "Artist couldn't be found",
        statusCode: 404
      })
    }

    console.log(details)

    res.json({"id": details.id, "username": details.username, "totalAlbums": albums, "totalSongs": songs, "imageUrl": details.imageUrl});
});




// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    // const existingEmail = await User.findAll({
    //   where: {email}
    // });
    // // console.log(existingEmail)

    // if (existingEmail) {
    //   res.statusCode = 403;
    //   res.json({
    //     message: "User already exists",
    //     statusCode: res.statusCode,
    //     errors: {
    //       email: "User with that email already exists"
    //     }
    //   })
    // }

    return res.json({
      user,
      // existingEmail
    });
  }
);

module.exports = router;
