const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, sequelize, Playlist } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');
const Sequelize = require("sequelize");


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




// Get all songs created by the specified artist.
router.get('/:userId/songs', async (req, res, next) => {
    const {userId} = req.params

 if (!await User.findByPk(userId)) {
       res.status(404)
      return res.json({
        message: "Artist couldn't be found",
        statusCode: 404
      });
  }

    const artistSongs = await Song.scope([{method: ['artistSongs', userId]}]).findAll({
        where: {
            userId: userId
        }
    });

    // error handling
    if (!artistSongs) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }
    /////////////////

    res.json({"Songs": artistSongs});
})


// Get details of an Artist from an id
router.get('/:userId', async (req, res) => {
  const {userId} = req.params


  const songs = await Song.count({where: {
    userId: userId
  }})

  const albums = await Album.count({where: {
    userId: userId
}})

  // if (!await User.findByPk(userId)) {
  //       res.status(404)
  //      return res.json({
  //        message: "Artist couldn't be found",
  //        statusCode: 404
  //      });
  //  }

  const details = await User.findByPk(userId
    // where: {
    //   userId: userId,
    // }
  );


    if (!details) {
      res.status(404);
      res.json({
        message: "Artist couldn't be found",
        statusCode: 404
      })
    }

    return res.json({"id": details.id, "username": details.username, "totalAlbums": albums, "totalSongs": songs, "imageUrl": details.imageUrl});
});


router.get('/', async (req, res) => {
  const playlists = await Playlist.findAll()
  res.json(playlists)
})




module.exports = router
