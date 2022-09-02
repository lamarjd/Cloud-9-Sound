const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment } = require('../../db/models');


// Create a Comment for a Song based on the Song's id
// authenticate: yes
router.post('/:songId/comments', requireAuth, async (req,res) =>{
  const userId = req.user.id
  const {songId} = req.params
  const {body} = req.body
  let find = await Song.findByPk(songId)
  if(!find){
    res.status(404)
    res.json({
      "message": "Song couldn't be found",
      "statusCode": 404
    })
  }
  let newComment = await Comment.create({
    userId,
    body,
    songId
  })
  res.json(newComment)
})



// Get all Comments by a Song's id
// auth no
router.get('/:songId/comments', async (req, res) => {
    const {songId} = req.params

    const commentScope = await Comment.scope([{method: ['songComment', songId]}]).findAll();

    // const comments = await Song.scope(['comment']).findByPk(songId, {
    //     include: [{model: Comment,
    //       // attributes: ['id','userId', 'songId', 'body', 'createdAt', 'updatedAt'],
    //         model: User,
    //         attributes: ['id', 'username']
    //     }]
    // })

    if (!commentScope) {
      res.status(404);
      return res.json({
        message: "Song couldn't be found",
        statusCode: 404
      })
    }

    res.json({"Comments": [commentScope]})
});

// Get all Songs created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const userSongs = await Song.findAll({  where: {userId} });
    res.json({"Songs":userSongs})
})

// Edit a song
// authenticate: yes
// authorize: yes -  Song must belong to the current user
router.put('/:songId', requireAuth, async (req, res, next) => {

  const { songId } = req.params;
  const { title, description, url, imageUrl, albumId } = req.body;

  const editSong = await Song.findByPk(songId, {
    attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
  });

  // error handling
  // if song Id does not match a record in the db
  if (!editSong) {
    res.status(404);
    return res.json({
      message: "Song couldn't be found",
      statusCode: 404
    });
  }

  // authorization - only current user can edit songs that belong to the user
  if (editSong.userId !== req.user.id) {
       res.status(403)
       res.json({
        message: "You do not have authorization to edit this song",
        statusCode: 403
        });
      }
  //////////////////

  if (editSong.userId === req.user.id) {
    if (title && description && url && imageUrl) {
        editSong.title = title;
        editSong.description = description;
        editSong.url = url;
        editSong.imageUrl = imageUrl;
        if (!albumId) {
          editSong.albumId = null
        } else {
          editSong.albumId = albumId;
        };

        await editSong.save();
        return res.json(editSong);
    }
  }
});


router.get('/:songId', async (req,res) =>{
  const {songId} = req.params

  const songs = await Song.findByPk(songId, {
    include: [{model:User,
      attributes: ['id','username','imageUrl']
    },
    {model: Album,
      attributes: ['id','title','imageUrl']}
    ],
  });

  // error handling
  if(!songs){
      res.status(404)
      return res.json({
        message: "Song couldn't be found",
        statusCode: 404
      })
    };

  return res.json(songs)
});

// Deletes an existing song.
// authenticate: yes
// authorize: yes -  Song must belong to the current user
router.delete('/:songId', requireAuth, async (req, res, next) => {
  const { songId } = req.params
  const deleteSong = await Song.findByPk(songId)

  // error handling
  if (!deleteSong) {
    res.status(404);
    return res.json({
      message: "Song cound't be found",
      statusCode: 404
    })
  }

   // authorization - only current user can delete songs that belong to the user
  if (deleteSong.userId !== req.user.id) {
       res.status(403)
       res.json({
        message: "You do not have authorization to delete this song",
        statusCode: 403
        });
      }
  //////////////////

    deleteSong.destroy()
    res.status(200);
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
});

//Creates and returns a new song with or without an album.
// authenticate: yes
router.post('/', requireAuth, async (req, res, next) => {
  const userId = req.user.id
  const {title, description, url, imageUrl, albumId } = req.body

  const song = await Song.create({
    title,
    description,
    url,
    imageUrl,
    albumId,
    userId
    });
 if(!song){
      res.status(404)
      return res.json({
        message: "Album couldn't be found",
        statusCode: 404
      })
    }
    res.status(201)
    res.json(song)
})

// find All Songs
router.get('/', async (req, res, next) => {
    const songs = await Song.findAll({
    });
    res.json(songs)
});




module.exports = router
