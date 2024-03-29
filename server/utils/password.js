import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { verifyAviralPassword } from './aviral.js';
import { authenticateLdap } from './ldap.js';
export function getJwt(object, expiresIn = '30d') {
  const secret = process.env.SECRET;
  const options = {
    algorithm: 'HS256', // Use HS256 algorithm
    expiresIn: expiresIn,
  };

  // Sign the JWT with the payload, secret key, and options
  const token = jwt.sign({ payload: object }, secret, options);

  return token;
}

export function verifyJwt(token) {
  const secret = process.env.SECRET;
  const options = {
    algorithms: ['HS256'],
  };
  // Verify the JWT
  const decoded = jwt.verify(token, secret, options);

  return decoded;
}

export function verifyPassword(username, password) {
  if (process.env.USE_AVIRAL === 'true') {
    return verifyAviralPassword(username, password);
  } else {
    return authenticateLdap(username, password);
  }
}
