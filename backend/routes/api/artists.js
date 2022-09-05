const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const { Op } = require('sequelize');
const Sequelize = require("sequelize");

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
  const userId = req.user.id

 if (!await User.findByPk(userId)) {
       res.status(404)
      return res.json({
        message: "Artist couldn't be found",
        statusCode: 404
      });
  }

  const songs = await Song.count({where: userId})

  const albums = await Album.count({where: userId})


  const details = await User.findByPk(userId, {
      // attributes: ['id', 'username', 'imageUrl'],
    where: {
      userId: userId,
    }
});


    if (!details) {
      res.status(404);
      res.json({
        message: "Artist couldn't be found",
        statusCode: 404
      })
    }

    res.json({"id": details.id, "username": details.username, "totalAlbums": albums, "totalSongs": songs, "imageUrl": details.imageUrl});
});







module.exports = router
