const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User } = require('../../db/models');

// Get all Albums created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const userAlbums = await Album.findAll({  where: {userId} });
    res.json({"Albums":userAlbums})
})


// Edit an album
// authenticate: yes
// authorize: yes -  Album must belong to the current user
router.put('/:albumId', requireAuth, async (req, res) =>{
  const {userId} = req.user.id
  const {albumId} = req.params
  const {title, description, imageUrl} = req.body
  const edited = await Album.findByPk(albumId)

  // error handling
  if(!edited){
    res.status(404)
    res.json({
        message: "Album couldn't be found",
        statusCode: 404
    })
  }

  if (!title) {
    res.status(400);
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        title: "Album title is required"
      }
    })
  }

  // authorization check
  if (edited.userId !== req.user.id) {
    res.status(403);
    res.json({
      message: "You do no have authorization to edit this album",
      statusCode: 403
    });
  }
  ////////////////
if (edited.userId === req.user.id) {
  if (title && description && imageUrl)
  edited.title = title
  edited.description = description
  edited.imageUrl = imageUrl
}

  await edited.save()
  return res.json(edited)
});

// Delete an existing Album.
// authenticate: yes
// authorize: yes
router.delete('/:albumId', requireAuth, restoreUser, async (req, res) => {
    const { albumId } = req.params
    const deleteAlbum = await Album.findByPk(albumId);

    // error handling
    if (!deleteAlbum) {
        res.status(404);
        res.json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }

    if (deleteAlbum.userId !== req.user.id) {
        res.status(403);
        res.json({
            message: "You do not have authorization to delete this album",
            statusCode: 403
        });
    }
    //////////////////

    deleteAlbum.destroy()
    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


// Get details of an Album from an id
// auth no
router.get('/:albumId', async (req,res) => {

  const {albumId} = req.params

  const artistAlbums = await Album.findByPk(albumId, {
    include: [{model:User,
      as: 'Artist',
      attributes: ['id','username','imageUrl']
    },
    {model: Song}
    ],
  })
  if(!artistAlbums){
      res.status(404)
      return res.json({
        message: "Album couldn't be found",
        statusCode: 404
      })
    }
  return res.json(artistAlbums)
})



// Create an Album
// auth true
router.post('/', requireAuth, async (req, res, next) => {
    const userId = req.user.id
    const { title, description, imageUrl} = req.body
    const album = await Album.create({
        userId,
        title,
        description,
        imageUrl
    });

    // error - if no title is provided
    if (!album.title) {
      res.status(400);
      res.json({
        message: "Validation Error",
        statuscode: 400,
        errors: {
          title: "Album title is required"
        }
      })
    }

    res.status(201)
    res.json(album)
});

// Get all Albums
// auth no
router.get('/', async (req, res) => {
    const albums = await Album.findAll()

    res.json({"Albums": albums})
});






module.exports = router
