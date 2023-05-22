import {
  response_200,
  response_400,
  response_500,
  response_201,
} from '../utils/responseCodes.js';
import { uploadImage } from '../utils/image.js';
import companyModel from '../models/company.model.js';
import companyUserRelationModel from '../models/relations/companyUser.relation.model.js';

export const getPaginatedCompanies = async (req, res) => {
  const { onlyEligible, sort, q } = req.query;
  const options = {
    pagination: req.query.page !== -1,
    page: req.query.page,
    limit: req.query.limit,
    sort: sort,
  };

  let query = {};
  if (onlyEligible) {
    query = {
      targets: {
        $elemMatch: {
          program: req.user.program,
          year: req.user.admissionYear,
          requiredCGPA: { $gte: req.user.cgpa },
        },
      },
    };
  }
  if (q) {
    query = {
      ...query,
      $or: [
        { name: { $regex: new RegExp(q), $options: 'i' } },
        { techStack: { $regex: new RegExp(q), $options: 'i' } },
      ],
    };
  }

  try {
    const companies = await companyModel.paginate(query, options);
    return response_200(res, 'OK', companies);
  } catch (err) {
    return response_500(res, err);
  }
};

export const getIndividualCompany = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return response_400(res, 'Invalid request');
  }
  try {
    const companyData = await companyModel.findById(id);
    if (!companyData) {
      return response_400(res, 'Invalid request');
    }

    if (
      !companyData.exclude.includes(req.user.rollNumber) && //should not be in exclude list
      (companyData.include.includes(req.user.rollNumber) || //can be in include list
        companyData.targets.some(
          //or should be eligible
          (target) =>
            target.program === req.user.program &&
            target.year === req.user.admissionYear &&
            target.requiredCGPA >= req.user.cgpa
        ))
    ) {
      const companyRelation = await companyUserRelationModel.findOne({
        companyId: id,
        userId: req.user._id,
      });
      if (companyRelation) {
        companyData.userStatus = companyRelation.status;
      }
      return response_200(res, 'OK', companyData);
    }
    return response_400(res, 'Invalid request');
  } catch (err) {
    return response_500(res, err);
  }
};

// This function is not verified yet.
export const registerUserToCompany = async (req, res) => {
  const { companyId } = req.params.id;
  const userId = req.user._id;

  if (!companyId) {
    return response_400(res, 'Invalid request');
  }

  try {
    const newRelation = await new companyUserRelationModel({
      companyId,
      userId,
      status: 'registered',
    }).save();

    return response_201(res, 'OK', newRelation);
  } catch (err) {
    return response_500(res, err);
  }
};

//This function is not verified yet.
export const getRegisteredCompanies = async (req, res) => {
  const { sort, q, page, limit } = req.query;

  const options = {
    pagination: page !== -1,
    page: page,
    limit: limit,
    sort: sort,
  };

  let query = {
    userId: req.user._id,
    status: {
      $in: ['registered', 'shortlisted', 'selected'],
    },
  };

  if (q) {
    query = {
      ...query,
      companyName: { $regex: new RegExp(q), $options: 'i' },
    };
  }
  try {
    const companies = await companyUserRelationModel.paginate(query, options);

    const companyIds = companies.map((company) => company.companyId);

    const companyData = await companyModel.find({
      _id: { $in: companyIds },
    });

    return response_200(res, 'OK', companyData);
  } catch (err) {
    return response_500(res, err);
  }
};
