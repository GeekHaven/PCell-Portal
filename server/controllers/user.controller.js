import User from '../models/user.model.js';
import {
  response_200,
  response_400,
  response_404,
  response_500,
} from '../utils/responseCodes.js';
import { getAviralData } from '../utils/aviral.js';
import { verifyPassword } from '../utils/password.js';

export const getUserData = async (req, res) => req.user;

export const updateCourseDetails = async (req, res) => {
  try {
    const { password } = req.body;

    if (await verifyPassword(req.user.rollNumber, password))
      return response_400(res, 'Invalid password');

    const userData = await getAviralData(req.user.rollNumber, password);
    if (!userData) return response_404(res, 'User not found');

    User.findOneAndUpdate(
      { rollNumber: req.user.rollNumber },
      {
        $set: {
          currentSem: userData.semester,
          completedCredits: userData.completedCredits,
          cgpa: userData.cgpa,
        },
      }
    );

    return response_200(res, 'Course details updated successfully');
  } catch (err) {
    response_500(res, err);
  }
};
