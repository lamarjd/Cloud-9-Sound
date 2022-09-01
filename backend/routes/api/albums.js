const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User } = require('../../db/models');



// Get details of an Album from an id
// auth no
router.get('/:albumId', async (req,res) => {

  const {albumId} = req.params

  const artistAlbums = await Album.findByPk(albumId, {
    include: [{model:User,
      attributes: ['id','username','imageUrl']
    },
    {model: Song,
      attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'imageUrl']}
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

// Get all Albums
// auth no
router.get('/', async (req, res) => {
    const albums = await Album.findAll()

    res.json({"Albums": albums})
});

// Get all Albums created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const userAlbums = await Album.findAll({  where: {userId} });
    res.json({"Albums":userAlbums})
})




module.exports = router
