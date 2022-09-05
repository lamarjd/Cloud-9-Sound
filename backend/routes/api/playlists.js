const express = require('express');
const router = express.Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Album, Song, User, Playlist, PlaylistSong } = require('../../db/models');
const playlistsong = require('../../db/models/playlistsong');



// Add a song to a playlist specified by the playlist's id.
// authenticate: yes [x]
// authorize: yes
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const {playlistId} = req.params;
    const {songId} = req.body;
    const userId = req.user.id

    if (!await Playlist.findByPk(playlistId)) {
      res.status(404)
     return res.json({
       message: "Playlist couldn't be found",
       statusCode: 404
     });
 }

   if (!await Song.findByPk(songId)) {
      res.status(404)
     return res.json({
       message: "Song couldn't be found",
       statusCode: 404
     });
 }

    await PlaylistSong.create({songId, playlistId});

    const findPlaylist = await PlaylistSong.findOne({
        where: {
            songId: songId,
            playlistId: playlistId
        },
        attributes: ['id', 'songId', 'playlistId']
    });


    /// double check authorization
    // if (findPlaylist.userId !== req.user.id) {
    //     res.status(403);
    //     res.json({
    //         message: "You do no have authorization to edit this playlist",
    //         statusCode: 403
    //     });
    // }


    res.json(
        findPlaylist
    );
});



// Get all Playlists created by the Current User
// requires auth
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const userPlaylists = await Playlist.findAll({  where: {userId} });
    res.json({"Playlists": userPlaylists})
})



// Edit a playlist
// authenticate: yes
// authorize: yes
router.put('/:playlistId', requireAuth, async (req, res) => {
    const {playlistId} = req.params
    const {name, imageUrl} = req.body
    const {userId} = req.user.id

    const edit = await Playlist.findByPk(playlistId, {
        attributes: ['id', 'userId', 'name', 'createdAt', 'updatedAt', 'imageUrl']
    });

      // error handling
    if (!edit) {
        res.status(404);
        res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        });
    }


       // authorization - only current user can edit playlist that belong to the user
    if (edit.userId !== req.user.id) {
       res.status(403);
       res.json({
        message: "You do not have authorization to edit this comment",
        statusCode: 403
       })
    }

    if (!edit.name) {
        res.status(400);
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                name: "Playlist name is required"
            }
        })
    }

      ///////////////////////
    // redundant - is this good practice still?
    if (edit.userId === req.user.id) {
        edit.name = name;
    }

    await edit.save()
    res.json(edit)

});

// Delete an existing playlist.
// authenticate: yes
// authorize: yes
router.delete('/:playlistId', requireAuth, restoreUser, async (req, res) => {
    const { playlistId } = req.params
    const deletePlaylist = await Playlist.findByPk(playlistId);

    // error handling
    // if (!deletePlaylist) {
    //     res.status(404);
    //     return res.json({
    //         message: "Playlist couldn't be found",
    //         statusCode: 404
    //     })
    // }
    if (!await Playlist.findByPk(playlistId)) {
        res.status(404);
        return res.json({
        message: "Playlist couldn't be found",
        statusCode: 404
      });
    }

    if (deletePlaylist.userId !== req.user.id) {
        res.status(403);
        res.json({
            message: "You do not have authorization to delete this playlist",
            statusCode: 403
        });
    }
    //////////////////

    deletePlaylist.destroy()
    res.status(200);
    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});

// Get details of a playlist by Id
router.get('/:playlistId', async (req, res) => {
    const {playlistId} = req.params

  const playlistDetails = await Playlist.findByPk(playlistId, {
    include: [{model:Song, through:{attributes:[]}
    //   attributes: ['id','userId','albumId', 'title', ' description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
    }],
  });

//   error handling
  if(!playlistDetails){
      res.status(404)
      return res.json({
        message: "Playlist couldn't be found",
        statusCode: 404
      })
    };

  return res.json(playlistDetails)
})



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
        res.status(400);
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                name: "Playlist name is required"
            }
        })
    }
    res.status(201)
    res.json(playlist)
});


router.get('/', async (req, res) => {
    const allPlaylists = await Playlist.findAll({
        include: {model: Song}
    })
    res.json(allPlaylists)
})


module.exports = router
