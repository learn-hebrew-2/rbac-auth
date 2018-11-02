// const jwt = require('jsonwebtoken');
// const config = require('config');
import jwt from 'jsonwebtoken';
import config from 'config';

export default function checkPermissions(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  
  try {
    const tokenDecoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = tokenDecoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token provided');
  }
}
