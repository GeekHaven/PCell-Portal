import Company from '../../models/company.model.js';
import companyUserRelationModel from '../../models/relations/companyUser.relation.model.js';
import { uploadImage, deleteImage } from '../../utils/image.js';
import { companyStatusPriority } from '../../utils/queries/companyStatusPriority.js';
import {
  response_200,
  response_500,
  response_400,
  response_201,
} from '../../utils/responseCodes.js';

export async function addCompany(req, res) {
  const { name, targets, techStack, hidden } = req.body;
  if (!name || !req.file) return response_400(res, 'Invalid request');
  try {
    if (await Company.exists({ name }))
      return response_400(res, 'Company already exists');
    const logo = await uploadImage(req.file);
    if (!logo) return response_400(res, 'Invalid image');
    const company = await Company.create({
      name,
      logo,
      targets: JSON.parse(targets),
      techStack,
      hidden,
    });
    delete company._id;
    delete company.__v;
    return response_201(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
}
export async function updateCompany(req, res) {
  let { name, targets, techStack, logo } = req.body;
  if (!name) return response_400(res, 'Invalid request');
  const companyId = req.params.id;
  let company = await Company.findById(companyId);
  if (!company) return response_400(res, 'Company not found');
  if (req.file) {
    await deleteImage(company.logo);
    const logoUrl = await uploadImage(req.file);
    if (!logoUrl) return response_400(res, 'Invalid image');
    logo = logoUrl;
  }
  company.name = name;
  company.targets = JSON.parse(targets);
  company.techStack = techStack;
  company.logo = logo;
  try {
    await company.save();
  } catch (err) {
    return response_500(res, err);
  }
  return response_201(res, 'OK', company);
}

export const getPaginatedCompanies = async (req, res) => {
  const { q } = req.query;
  let { sort, sortBy, page, limit } = req.query;

  if (!page || !limit || !sort || !sortBy) {
    return response_400(res, 'Invalid request');
  }
  //changing types to required types
  page = parseInt(page);
  limit = parseInt(limit);
  if (sortBy === 'status') sortBy = 'priority';
  if (sortBy === 'isEligible') sort = sort * -1; // to make true first
  sort = parseInt(sort);

  try {
    let companyListAggregate = Company.aggregate([
      {
        $match: {
          name: { $regex: new RegExp(q), $options: 'i' },
        },
      },
      {
        $addFields: {
          priority: companyStatusPriority('currentStatus'),
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

export const getAllCompanies = async (req, res) => {
  try {
    const companyList = await Company.find();
    return response_200(res, 'OK', companyList);
  } catch (err) {
    console.log(err);
    return response_500(res, err);
  }
};

export const getCompanyById = async (req, res) => {
  let { id } = req.params;
  if (!id) {
    return response_400(res, 'Invalid request');
  }
  try {
    const companyData = await Company.findById(id);
    if (!companyData) {
      return response_400(res, 'Invalid request');
    }
    return response_200(res, 'OK', companyData);
  } catch (err) {
    return response_500(res, err);
  }
};

export const getUsersRelatedToCompany = async (req, res) => {
  let id = req.params.id;
  if (!id) {
    return response_400(res, 'Invalid request');
  }
  try {
    const users = await companyUserRelationModel
      .find({ companyId: id })
      .populate('userId', '_id name rollNumber');
    return response_200(res, 'OK', users);
  } catch (err) {
    return response_500(res, err);
  }
};

export const batchUpdateUsersRelatedToCompany = async (req, res) => {
  let { id } = req.params;
  let { relations } = req.body;
  if (!id || !relations) {
    return response_400(res, 'Invalid request');
  }
  try {
    const company = await Company.findById(id);
    if (!company) {
      return response_400(res, 'Invalid request');
    }
    await companyUserRelationModel.deleteMany({ companyId: id });
    const newRelations = relations.map((relation) => ({
      companyId: id,
      userId: relation.userId,
      status: relation.status,
    }));
    await companyUserRelationModel.insertMany(newRelations);
    return response_201(res, 'OK');
  } catch (err) {
    return response_500(res, err);
  }
};

export const setCompanyVisibility = async (req, res) => {
  let { id } = req.params;
  let { hidden } = req.body;
  if (!id || hidden === undefined) {
    return response_400(res, 'Invalid request');
  }
  try {
    const company = await Company.findById(id);
    if (!company) {
      return response_400(res, 'Invalid request');
    }
    company.hidden = hidden;
    await company.save();
    return response_201(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
};

export const setCompanyStatus = async (req, res) => {
  let { id } = req.params;
  let { status } = req.body;
  if (!id || status === undefined) {
    return response_400(res, 'Invalid request');
  }
  try {
    const company = await Company.findById(id);
    if (!company) {
      return response_400(res, 'Invalid request');
    }
    company.currentStatus = status;
    await company.save();
    return response_201(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
};

export const deleteCompany = async (req, res) => {
  let { id } = req.params;
  if (!id) {
    return response_400(res, 'Invalid request');
  }
  try {
    const company = await Company.findById(id);
    if (!company) {
      return response_400(res, 'Invalid request');
    }
    let tasks = [];
    tasks.push(Company.findByIdAndDelete(id));
    tasks.push(companyUserRelationModel.deleteMany({ companyId: id }));
    await Promise.all(tasks);
    await deleteImage(company.logo);
    return response_200(res, 'OK');
  } catch (err) {
    return response_500(res, err);
  }
};
