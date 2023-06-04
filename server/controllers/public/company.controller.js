import {
  response_200,
  response_400,
  response_500,
} from '../../utils/responseCodes.js';
import Company from '../../models/company.model.js';
import mongoose from 'mongoose';

export const getIndividualCompany = async (req, res) => {
  let { id } = req.params;
  console.log('seckss');
  if (!id) {
    return response_400(res, 'Invalid request');
  }
  try {
    const [companyData] = await Company.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $project: {
          name: 1,
          logo: 1,
          _id: 1,
          currentStatus: 1,
          hidden: 1,
          techStack: 1,
        },
      },
    ]);

    if (!companyData) {
      return response_400(res, 'Invalid request');
    }
    return response_200(res, 'OK', companyData);
  } catch (err) {
    return response_500(res, err);
  }
};
