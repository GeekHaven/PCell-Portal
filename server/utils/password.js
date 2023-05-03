import dotenv from 'dotenv';
dotenv.config()
import jwt from 'jsonwebtoken';
export function getJwt(object,expiresIn='30d'){
    const secret = process.env.SECRET; 
    const options = {
      algorithm: 'HS256', // Use HS256 algorithm
      expiresIn: expiresIn
    };
  
    // Sign the JWT with the payload, secret key, and options
    const token = jwt.sign({ payload: object }, secret, options);
  
    return token;
  }