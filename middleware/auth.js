const jwt = require('jsonwebtoken');

const config = require('../config');
const User = require('../model/user');

function getToken(req) {
  let token = null;
  if ((req.headers && (req.headers['x-auth-token'] || req.headers.authorization)) || req.params.token) {
    if (req.headers['x-auth-token']) {
      token = req.headers['x-auth-token'];
    }
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (req.params.token) token = req.params.token;
  }
  return token;
}

async function authenticate(req, res, next) {
  try {
    const token = getToken(req);
    // if token is not present in the http header
    if (!token) {
      return res.status(401).send({
        message: 'Unauthorized. Access Denied',
        success: false,
      });
    }

    const decoded = jwt.verify(token, config.JWT_KEY);
    const user = await User.findOne({
      email: decoded.email,
    });
    // if user does not exist in database
    if (!user) {
      return res.status(401).send({
        message: 'Unauthorized. Access Denied',
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).send({
		success: false,
        message: 'Invalid Token. Access Denied',
      });
    }
    next(error);
  }
}

function authorize(req, res, next) {
  if (!req.user.isAdmin === 'true') {
    return res.status(403).send({
      message: 'Forbidden. Access Denied',
	  success: false,
    });
  }
  next();
}
module.exports = {
  authorize,
  authenticate,
};
