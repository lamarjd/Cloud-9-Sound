const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Song, User, Album, Comment, PlaylistSong } = require('../../db/models');


// Create a Comment for a Song based on the Song's id
// authenticate: yes
router.post('/:songId/comments', requireAuth, async (req,res) =>{
  const userId = req.user.id
  const {songId} = req.params
  const {body} = req.body
  let find = await Song.findByPk(songId)

  // error - if the song with the songId is not found
  if(!find.id){
    res.status(404)
    res.json({
      message: "Song couldn't be found",
      statusCode: 404
    })
  }

  // error - if the comment body is empty
  if (!body) {
    res.status(400);
    return res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        body: "Comment body text is required"
      }
    })
  }

  // create the new comment
  let newComment = await Comment.create({
    userId,
    songId,
    body
  });
  res.json(newComment)
});

// Get all Comments by a Song's id
// auth no
router.get('/:songId/comments', async (req, res) => {
    const {songId} = req.params


    if (!await Song.findByPk(songId)) {
      res.status(404);
      return res.json({
        message: "Song couldn't be found",
        statusCode: 404
      });
    }

    const commentScope = await Comment.scope([{method: ['songComment', songId]}]).findAll({
      where: {
        songId: songId
      }
    });


    res.json({"Comments": commentScope})
});

// Get all Songs created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res, next) => {
    const userId = req.user.id;

    const userSongs = await Song.findAll({  where: {userId} });
    res.json({"Songs":userSongs});
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
  // if songId does not match a record in the db
  if (!editSong) {
    res.status(404);
    return res.json({
      message: "Song couldn't be found",
      statusCode: 404
    });
  }

  if (!title) {
    res.status(400);
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
        url: "Audio is required"
      }
    })
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

// Get details of a Song from an id
router.get('/:songId', async (req,res) =>{
  const {songId} = req.params

  const songs = await Song.findByPk(songId, {
    include: [{model:User,
      as: 'Artist',
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

  let {title, description, url, imageUrl, albumId } = req.body

// check albumID in req.body. If it's falsey, throw error
  if (albumId && albumId !== null) {
    let search = await Album.findByPk(albumId)
    if (!search) {
      res.status(404)
      return res.json({
        message: "Album couldn't be found",
        statusCode: 404
      });
    }
  }

    const song = await Song.create({
      title,
      description,
      url,
      imageUrl,
      albumId,
      userId
    });

if (!song.title) {
  res.status(400);
    res.json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
        url: "Audio is required"
      }
    });
  }

  res.status(201)
  res.json(song)

})

// find All Songs
router.get('/', async (req, res, next) => {

  let errorResult = {errors: [], count: 0, pageCount: 0};
  let {page, size, createdAt, title} = req.query

  if (!size) {
    size = 20
  }
  if (!page) {
    page = 1
  }

  size = parseInt(size)
  page = parseInt(page)

  const pagination = {};

  if (Number.isInteger(page) && Number.isInteger(size) && page >= 1 && size >= 1) {
    pagination.limit = size;
    pagination.offset = size * (page - 1)
  } else if (size < 0 || page < 0 || page > 10 || !createdAt) {
  errorResult.errors.push({
    message: "Validation Error",
    statusCode: 400,
    errors: {
      page: "Page must be greater than or equal to 0",
      size: "Size must be greater than or equal to 0",
      createdAt: "CreatedAt is invalid"
    }
  })
}

  if (errorResult.errors.length) {
    errorResult.count = await Song.count()
    res.status(400);
    res.json(errorResult)
    return;
  }

let result = {};

result.songs = await Song.findAll({
  attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl'],
      ...pagination
    });

    // To set a default if both page and size are = 0
    //   if (page === '0' && size === '0') {
    //     result.page = 1;
    //     result.size = 1
    // } else {
    //     result.page = page
    //     result.size = size
    // }

    result.page = page || 1
    result.size = size

    // Show the count on the next page depending on number of items
    // result.pageCount = size === 0 ? 1 : Math.ceil(result.count / size);
    // result.pageCount = Math.floor((result.count / size) + 1)

    res.json({"Songs": result.songs, "page": result.page, "size": result.size})
});




module.exports = router
