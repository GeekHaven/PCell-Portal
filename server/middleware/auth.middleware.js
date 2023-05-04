import jwt from 'jsonwebtoken';
import { response_401, response_500 } from '../utils/responseCodes.js';
import User from '../models/user.model.js';

export async function verifyUser(req, res, next) {
  const token = req.headers['Authorization'];
  if (!token) return response_401(res, 'Unauthorized');
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ rollNumber: decoded.rollNumber });
    if (!user) return response_401(res, 'Unauthorized');
    req.user = user;
    next();
  } catch (err) {
    return response_500(res, err);
  }
}
