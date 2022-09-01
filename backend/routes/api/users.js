// This file will hold the resources for the route paths beginning with /api/users. Create and export an Express router from this file.

const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Get all Songs of an Artist from an id
// no auth
// router.get('/artists/:id/songs', async (req, res, next) => {
//   const {userId} = req.params

//   res.send("hello")
// })

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName } = req.body;
    const user = await User.signup({ email, username, password, firstName, lastName });

    await setTokenCookie(res, user);

    // const existingEmail = await User.findAll({
    //   where: {email}
    // });
    // // console.log(existingEmail)

    // if (existingEmail) {
    //   res.statusCode = 403;
    //   res.json({
    //     message: "User already exists",
    //     statusCode: res.statusCode,
    //     errors: {
    //       email: "User with that email already exists"
    //     }
    //   })
    // }

    return res.json({
      user,
      // existingEmail
    });
  }
);

module.exports = router;
