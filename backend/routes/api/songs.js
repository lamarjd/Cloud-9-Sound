const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User } = require('../../db/models');

// res.send("Hello")




// Get all Songs created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const userSongs = await Song.findAll({  where: {userId} });
    res.json({"Songs":userSongs})
})


//Creates and returns a new song with or without an album.
// auth true
router.post('/', requireAuth, async (req, res, next) => {
    const {title, description, url, imageUrl, albumId } = req.body
    const song = await Song.create({
        title,
        description,
        url,
        imageUrl,
        albumId
    });

    res.json(song)
})

// find All Songs
router.get('/', async (req, res, next) => {
    const songs = await Song.findAll({
    });
    res.json(songs)
});




module.exports = router
