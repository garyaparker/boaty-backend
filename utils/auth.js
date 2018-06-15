const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '2oi4u5o3i4u5po3iu453l;4kj53;l4kj5345345';

const signJwt = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: '2 days' });
};

const decrytpJwt = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { signJwt, decrytpJwt };
