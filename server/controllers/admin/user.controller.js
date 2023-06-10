import User from '../../models/user.model.js';
import {
  response_200,
  response_500,
  response_400,
} from '../../utils/responseCodes.js';
import companyModel from '../../models/company.model.js';
import { getEligibleUsersForTarget } from '../../utils/queries/getEligibleUsersForTarget.js';
import { uploadImage } from '../../utils/image.js';

export async function getPaginatedUsers(req, res) {
  const { programs, admissionYears, rollNumbers } = req.query;
  const options = {
    pagination: req.query.page !== -1,
    page: req.query.page,
    limit: req.query.limit,
  };
  let query = {
    rollNumber: { $regex: new RegExp(rollNumbers), $options: 'i' },
    admissionYear: { $regex: new RegExp(admissionYears), $options: 'i' },
    program: { $regex: new RegExp(programs), $options: 'i' },
  };
  try {
    const users = await User.paginate(query, options);
    return response_200(res, 'OK', users);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function addCompany(req, res) {
  const { name, targets } = req.body;
  if (!name) return response_400(res, 'Invalid request');
  try {
    const logo = await uploadImage(req.file);
    if (!logo) return response_400(res, 'Invalid image');
    const company = await companyModel.create({ name, logo, targets });
    return response_200(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
}

export async function getUserGroups(req, res) {
  const data = await User.aggregate([
    {
      $group: {
        _id: '$admissionYear',
        programs: { $addToSet: '$program' },
      },
    },
  ]);
  let result = {};
  data.forEach((item) => {
    result[item._id] = item.programs;
  });
  return response_200(res, 'OK', result);
}

export const searchUserByRollNumberOrName = async (req, res) => {
  const rollNumber = req?.query?.q || '';

  try {
    const users = await User.find({
      $or: [
        {
          $and: [
            {
              $or: [
                {
                  rollNumber: { $regex: rollNumber, $options: 'i' },
                },
                {
                  name: { $regex: rollNumber, $options: 'i' },
                },
              ],
            },
            {
              $and: [
                {
                  rollNumber: { $nin: req?.query?.exclude?.split(';') },
                },
                {
                  rollNumber: { $nin: req?.query?.include?.split(';') },
                },
              ],
            },
          ],
        },
      ],
    })
      .select('rollNumber name -_id')
      .limit(10);

    const includeUsers = await User.find({
      rollNumber: { $in: req?.query?.include?.split(';') },
    }).select('rollNumber name -_id');

    return response_200(res, 'OK', [...users, ...includeUsers]);
  } catch (err) {
    return response_500(res, err);
  }
};

export const getUsersEligibleForTarget = async (req, res) => {
  const { targets } = req.body;
  try {
    const users = await User.aggregate([
      {
        $addFields: {
          isEligible: getEligibleUsersForTarget(targets),
        },
      },
      {
        $match: {
          isEligible: true,
        },
      },
      {
        $project: {
          _id: 0,
          isEligible: 0,
        },
      },
    ]);
    users.map((user) => {
      user['cgpa'] = Number(user['cgpa']).toFixed(2);
      return user;
    });
    return response_200(res, 'OK', users);
  } catch (err) {
    return response_500(res, err);
  }
};
