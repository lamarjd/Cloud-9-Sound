const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album } = require('../../db/models');

// res.send("Hello")




// Get all Songs created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const userSongs = await Song.findAll({  where: {userId} });
    res.json({"Songs":userSongs})
})

router.put('/:songId', requireAuth, async (req, res, next) => {

    const { songId } = req.params;
    const { title, description, url, imageUrl, albumId } = req.body;

    const editSong = await Song.findByPk(
        songId,
        editSong.title = title,
        description,
        url,
        imageUrl,
        albumId
    );
    res.json(editSong)
});

router.get('/:songId', async (req,res) =>{
//   console.log(req.params)
  const {songId} = req.params

//   console.log(songId)
  const songs = await Song.findByPk(songId, {
    include: [{model:User,
      attributes: ['id','username','imageUrl']
    },
    {model: Album,
      attributes: ['id','title','imageUrl']}
    ],
  })
  if(!songs){
      res.status(404)
      return res.json({
        message: "Song couldn't be found",
        statusCode: 404
      })
    }
  return res.json(songs)
})

//Creates and returns a new song with or without an album.
// auth true
router.post('/', requireAuth, async (req, res, next) => {

    const {title, description, url, imageUrl, albumId } = req.body
    if (!albumId) {

        const song = await Song.create({
            title,
            description,
            url,
            imageUrl,
            albumId: null
        },
        // {
            // include: ['title', 'description', 'url', 'imageUrl', 'albumId']
        // }
        );
        res.json(song)
    } else {
        const songAlbumId = await Song.create({
            title,
            description,
            url,
            imageUrl,
            albumId
        })
        res.json(songAlbumId)
    }


})

// find All Songs
router.get('/', async (req, res, next) => {
    const songs = await Song.findAll({
    });
    res.json(songs)
});




module.exports = router
