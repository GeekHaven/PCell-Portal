import User from '../models/user.model.js';
import {
  response_200,
  response_400,
  response_404,
  response_500,
} from '../utils/responseCodes.js';
import { getAviralData } from '../utils/aviral.js';
import { verifyPassword } from '../utils/password.js';


export const getUserData = async (req, res) => {
  let user = await User.findOne({ rollNumber: req.user.rollNumber }).lean();
  delete user['_id'];
  delete user['__v'];
  delete user['createdAt'];
  delete user['updatedAt'];
  user['cgpa'] = Number(user['cgpa']).toFixed(2);
  return response_200(res, 'OK', user);
};

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
        currentSem: userData.semester,
        completedCredits: userData.completedCredits,
        cgpa: userData.cgpa,
        program: userData.program,
        admissionYear: userData.admissionYear,
      }
    );

    return response_200(res, 'Course details updated successfully');
  } catch (err) {
    response_500(res, err);
  }
};
