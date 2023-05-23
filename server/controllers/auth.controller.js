import {
  response_200,
  response_201,
  response_400,
  response_404,
  response_403,
  response_500,
} from '../utils/responseCodes.js';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { getJwt, verifyPassword } from '../utils/password.js';
import { getAviralData } from '../utils/aviral.js';

export async function logIn(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return response_400(res, 'Username or password missing');

    if (!(await verifyPassword(username, password)))
      return response_400(res, 'Invalid password');
    const user = await User.findOne({
      rollNumber: username?.toUpperCase(),
    });

    if (!user) {
      const userData = await getAviralData(username, password);
      if (!userData) return response_404(res, 'User not found');
      const newUser = await User.create({
        name: userData.name,
        rollNumber: userData.rollNumber?.toUpperCase(),
        mobile: userData.mobile,
        cgpa: userData.cgpa,
        currentSem: userData.semester,
        completedCredits: userData.completedCredits,
        totalCredits: userData.totalCredits,
        program: userData.program,
        admissionYear: userData.admissionYear,
      });
      newUser.save();
      const token = getJwt({
        rollNumber: newUser.rollNumber,
        name: newUser.name,
      });
      return response_201(res, 'OK', {
        token,
        status: true,
        rollNumber: newUser.rollNumber,
        isAdmin: newUser.isAdmin,
      });
    }

    const token = getJwt({ rollNumber: user.rollNumber, name: user.name });
    return response_200(res, 'OK', {
      token,
      status: true,
      rollNumber: user.rollNumber,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    response_500(res, err);
  }
}

export async function isUser(req, res) {
  const token = req.header('Authorization');
  if (!token) return response_200(res, { status: false });
  let decoded = false;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
  } catch (e) {
    return response_403(res, 'Invalid token');
  }
  try {
    const user = await User.findOne({ rollNumber: decoded.payload.rollNumber });
    if (!user) return response_200(res, 'OK', { status: false });
    return response_200(res, 'OK', {
      status: true,
      rollNumber: user.rollNumber,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    return response_500(res, err);
  }
}
