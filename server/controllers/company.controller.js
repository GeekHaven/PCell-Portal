import {
  response_200,
  response_400,
  response_500,
  response_201,
} from '../utils/responseCodes.js';
import Company from '../models/company.model.js';
import companyUserRelationModel from '../models/relations/companyUser.relation.model.js';
import { isUserEligibleInTarget } from '../utils/queries/isUserEligibleInTarget.js';
import { companyStatusPriority } from '../utils/queries/companyStatusPriority.js';

export const getPaginatedCompanies = async (req, res) => {
  const { q } = req.query;
  let { sort, sortBy, onlyEligible, page, limit } = req.query;

  if (!page || !limit || !sort || !sortBy) {
    return response_400(res, 'Invalid request');
  }
  //changing types to required types
  page = parseInt(page);
  limit = parseInt(limit);
  onlyEligible = onlyEligible === 'true' ? true : false;
  if (sortBy === 'status') sortBy = 'priority';
  if (sortBy === 'isEligible') sort = sort * -1; // to make true first
  sort = parseInt(sort);

  try {
    let companyListAggregate = Company.aggregate([
      {
        $match: {
          name: { $regex: new RegExp(q), $options: 'i' },
          hidden: false,
        },
      },
      {
        $addFields: {
          isEligible: isUserEligibleInTarget(req.user),
          priority: companyStatusPriority('currentStatus'),
        },
      },
      {
        $match: {
          isEligible: {
            $in: [true, onlyEligible],
          },
        },
      },
      {
        $sort: {
          [sortBy]: sort,
        },
      },
      {
        $project: {
          name: 1,
          logo: 1,
          isEligible: 1,
          _id: 1,
          currentStatus: 1,
        },
      },
    ]);
    let companyList = await Company.aggregatePaginate(companyListAggregate, {
      page,
      limit,
    });
    console.log(companyList);
    return response_200(res, 'OK', companyList);
  } catch (err) {
    return response_500(res, err);
  }
};

export const getIndividualCompany = async (req, res) => {
  let { id } = req.params;
  id = Buffer.from(id, 'base64').toString('hex');

  if (!id) {
    return response_400(res, 'Invalid request');
  }
  try {
    const companyData = await Company.findById(id);
    if (!companyData) {
      return response_400(res, 'Invalid request');
    }

    if (
      !companyData.targets.exclude.includes(req.user.rollNumber) && //should not be in exclude list
      (companyData.targets.include.includes(req.user.rollNumber) || //can be in include list
        companyData.targets.groups.some(
          //or should be eligible
          (group) =>
            group.program === req.user.program &&
            group.year === req.user.admissionYear &&
            group.requiredCGPA >= req.user.cgpa
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

    const companyData = await Company.find({
      _id: { $in: companyIds },
    });

    return response_200(res, 'OK', companyData);
  } catch (err) {
    return response_500(res, err);
  }
};
