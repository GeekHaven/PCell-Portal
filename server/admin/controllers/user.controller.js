import User from '../../models/user.model.js';
import {
  response_200,
  response_500,
  response_400,
} from '../../utils/responseCodes.js';
import companyModel from '../../models/company.model.js';
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
    const logo = await uploadImage(req.file.image);
    const company = await companyModel.create({ name, logo, targets });
    return response_200(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
}
