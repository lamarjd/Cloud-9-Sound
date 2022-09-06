// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const songsRouter = require('./songs.js');
const albumsRouter = require('./albums.js');
const commentsRouter = require('./comments.js');
const artistsRouter = require('./artists.js');
const playlistsRouter = require('./playlists.js');
const Sequelize = require("sequelize");
const { restoreUser } = require("../../utils/auth.js");

// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');

// router.get('/set-token-cookie', async (_req, res) => {
  //   const user = await User.findOne({
    //       where: {
      //         username: 'Demo-lition'
      //       }
      //     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
  //   '/require-auth',
  //   requireAuth,
  //   (req, res) => {
    //     return res.json(req.user);
    //   }
    // );
    // Connect restoreUser middleware to the API router
    // If current user session is valid, set req.user to the user in the database
    // If current user session is not valid, set req.user to null
    router.use(restoreUser);

// router.get('/restore-user', (req, res) => {
//     return res.json(req.user);
//   }
// );

// API imports
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/songs', songsRouter);
router.use('/albums', albumsRouter);
router.use('/comments', commentsRouter);
router.use('/artists', artistsRouter);
router.use('/playlists', playlistsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
