// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax"
    });

  // console.log(token)
  return token;
};

// Certain authenticated routes will require the identity of the current session user. You will create and utilize a middleware function called restoreUser that will restore the session user based on the contents of the JWT cookie.

// Create a middleware function that will verify and parse the JWT's payload and search the database for a User with the id in the payload. (This query should use the currentUser scope since the hashedPassword is not needed for this operation.) If there is a User found, then save the user to a key of user onto the Request, req.user. If there is an error verifying the JWT or a User cannot be found with the id, then clear the token cookie from the response and set req.user to null.

const restoreUser = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.user = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) res.clearCookie('token');

    return next();
  });
};

// The last authentication middleware to add is for requiring a session user to be authenticated before accessing a route.

// Create an Express middleware called requireAuth. Define this middleware as an array with the restoreUser middleware function you just created as the first element in the array. This will ensure that if a valid JWT cookie exists, the session user will be loaded into the req.user attribute. The second middleware will check req.user and will go to the next middleware if there is a session user present there. If there is no session user, then an error will be created and passed along to the error-handling middlewares.


// If there is no current user, return an error
const requireAuth = function (req, _res, next) {
  if (req.user) return next();

  const err = new Error('Unauthorized');
  err.title = 'Unauthorized';
  err.errors = ['Unauthorized'];
  err.status = 401;
  return next(err);
}


module.exports = { setTokenCookie, restoreUser, requireAuth };
