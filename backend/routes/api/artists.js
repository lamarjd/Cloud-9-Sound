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

    const artistSongs = await Song.scope([{method: ['artistSongs', userId]}]).findAll({
    });

    // error handling
    if (!artistSongs.id) {
        res.status(404);
        res.json({
            message: "Artist couldn't be found",
            statusCode: 404
        })
    }
    /////////////////

    res.json({"Songs": artistSongs});
})










module.exports = router
