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
import { userStatusPriority } from '../utils/queries/userStatusPriority.js';
import mongoose, { get } from 'mongoose';

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
    return response_200(res, 'OK', companyList);
  } catch (err) {
    return response_500(res, err);
  }
};

export const getIndividualCompany = async (req, res) => {
  let { id } = req.params;
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
        $addFields: {
          isEligible: isUserEligibleInTarget(req.user),
        },
      },
      {
        $project: {
          name: 1,
          logo: 1,
          isEligible: 1,
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
    if (companyData.isEligible) {
      const companyRelation = await companyUserRelationModel.findOne({
        companyId: id,
        userId: req.user._id,
      });
      companyData.userStatus = companyRelation?.status;
      return response_200(res, 'OK', companyData);
    }
    return response_400(res, 'Invalid request');
  } catch (err) {
    return response_500(res, err);
  }
};

export const registerUserToCompany = async (req, res) => {
  const companyId = req.params.id;
  const userId = req.user._id;

  if (!companyId) {
    return response_400(res, 'Invalid request');
  }

  try {
    const companyRelation = await companyUserRelationModel.findOne({
      companyId,
      userId,
    });

    if (companyRelation) {
      return response_400(res, 'User already registered to this company');
    }

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

export const getRegisteredCompanies = async (req, res) => {
  let { sort, q, page, limit, sortBy } = req.query;
  sort = parseInt(sort);
  page = parseInt(page);
  limit = parseInt(limit);
  if (!page || !limit || !sort || !sortBy) {
    return response_400(res, 'Invalid request');
  }
  if (sortBy === 'status') sortBy = 'priority';
  const sortQuery = {};

  if (sortBy === 'name') {
    sortQuery['company.name'] = sort;
  } else {
    sortQuery[sortBy] = sort;
  }

  try {
    let companyListAggregate = companyUserRelationModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user._id),
          status: {
            $in: ['registered', 'shortlisted', 'selected', 'rejected'],
          },
        },
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'companyId',
          foreignField: '_id',
          as: 'company',
        },
      },
      {
        $unwind: '$company',
      },
      {
        $match: {
          'company.name': { $regex: new RegExp(q), $options: 'i' },
        },
      },
      {
        $addFields: {
          priority: userStatusPriority('status'),
        },
      },
      {
        $sort: {
          ...sortQuery,
        },
      },
      {
        $project: {
          'company.name': 1,
          'company.logo': 1,
          'company._id': 1,
          'company.currentStatus': 1,
          status: 1,
          _id: 0,
        },
      },
    ]);
    let companyList = await companyUserRelationModel.aggregatePaginate(
      companyListAggregate,
      {
        page,
        limit,
      }
    );

    companyList = {
      ...companyList,
      docs: companyList.docs.map((data) => {
        return {
          ...data.company,
          userStatus: data.status,
        };
      }),
    };
    return response_200(res, 'OK', companyList);
  } catch (err) {
    return response_500(res, err);
  }
};
