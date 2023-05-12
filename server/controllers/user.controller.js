import User from '../models/user.model.js';
import {
  response_200,
  response_400,
  response_404,
  response_500,
} from '../utils/responseCodes.js';
import { getAviralData } from '../utils/aviral.js';
import { verifyPassword } from '../utils/password.js';
import companyModel from '../models/company.model.js';

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

    if (!(await verifyPassword(req.user.rollNumber, password)))
      return response_400(res, 'Invalid password');

    const userData = await getAviralData(req.user.rollNumber, password);
    if (!userData) return response_404(res, 'User not found');

    const updatedUser = User.findOneAndUpdate(
      { rollNumber: req.user.rollNumber },
      {
        currentSem: userData.semester,
        completedCredits: userData.completedCredits,
        cgpa: userData.cgpa,
        program: userData.program,
        admissionYear: userData.admissionYear,
      }
    );

    return response_200(res, 'OK', updatedUser);
  } catch (err) {
    return response_500(res, err);
  }
};

export const saveChanges = async (req, res) => {
  try {
    const { password, mobile, resumeLink } = req.body;
    console.log(req.body);
    if (!(await verifyPassword(req.user.rollNumber, password)))
      return response_400(res, 'Invalid password');

    const updatedUser = await User.findOneAndUpdate(
      { rollNumber: req.user.rollNumber },
      {
        mobile,
        resumeLink,
      }
    );
    return response_200(res, 'OK', { mobile, resumeLink });
  } catch (err) {
    response_500(res, err);
  }
};

export const getUserGroups = async (req, res) => {
  try {
    let programs = User.distinct('program');
    let admissionYears = User.distinct('admissionYear');
    Promise.all([programs, admissionYears]).then((values) => {
      return response_200(res, 'OK', {
        programs: values[0],
        admissionYears: values[1],
      });
    });
  } catch (err) {
    response_500(res, err);
  }
};

export const getPaginatedCompanies = async (req, res) => {
  const { onlyEligible, sort, q } = req.query;
  const options = {
    pagination: req.query.page !== -1,
    page: req.query.page,
    limit: req.query.limit,
    sort: sort,
  }

  let query = {};
  if (onlyEligible) {
    query = {
      targets : {
        $elemMatch: {
          program: req.user.program,
          year: req.user.admissionYear,
          requiredCGPA: { $gte: req.user.cgpa },
        },
      }
    };
  }
  if (q) {
    query = {
      ...query,
      name: { $regex: new RegExp(q), $options: 'i' },
    };
  }

  try {
    const companies = await companyModel.paginate(query, options);
    return response_200(res, 'OK', companies);
  }
  catch (err) {
    return response_500(res, err);
  }

};
