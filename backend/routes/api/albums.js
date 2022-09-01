const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album } = require('../../db/models');

// Create an Album
// auth true
router.post('/', requireAuth, async (req, res, next) => {
    const {userId} = req.user.id
    const { title, description, imageUrl} = req.body
    const album = await Album.create({
        userId,
        title,
        description,
        imageUrl
    });
    res.json(album)
});



module.exports = router
