const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Playlist } = require('../../db/models');

// Create a new playlist
// authentication: yes
router.post('/', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const {name, imageUrl} = req.body
    const playlist = await Playlist.create({
        userId,
        name,
        imageUrl
    });

    if (!playlist.name) {
        next(err)
    }
    
    res.json(playlist)
});





module.exports = router
