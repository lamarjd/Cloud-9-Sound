// This file will hold the resources for the route paths beginning with /api/users. Create and export an Express router from this file.

const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


// Sign up
router.post(
  '/',
  async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

module.exports = router;
