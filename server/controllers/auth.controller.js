import {
  response_200,
  response_201,
  response_400,
  response_404,
  response_500,
} from '../utils/responseCodes.js';

import User from '../models/user.model.js';
import { getJwt, verifyPassword } from '../utils/password.js';
import { getAviralData } from '../utils/aviral.js';

export async function logIn(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return response_400(res, 'Username or password missing');

    if (await verifyPassword(username, password))
      return response_400(res, 'Invalid password');
    const user = await User.findOne({ rollNumber: username?.toUpperCase() });

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
      });
      newUser.save();
      const token = getJwt({ rollNumber: username, name: newUser.name });
      return response_201(res, token);
    }

    const token = getJwt({ rollNumber: username, name: user.name });
    return response_200(res, { token });
  } catch (err) {
    response_500(res, err);
  }
}
