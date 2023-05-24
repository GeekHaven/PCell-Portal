import CompanyModel from '../../models/company.model.js';
import companyUserRelationModel from '../../models/relations/companyUser.relation.model.js';
import { uploadImage, deleteImage } from '../../utils/image.js';
import {
  response_200,
  response_500,
  response_400,
  response_201,
} from '../../utils/responseCodes.js';

export async function addCompany(req, res) {
  const { name, targets, techStack } = req.body;
  if (!name || !req.file) return response_400(res, 'Invalid request');
  try {
    if (await CompanyModel.exists({ name }))
      return response_400(res, 'Company already exists');
    const logo = await uploadImage(req.file);
    if (!logo) return response_400(res, 'Invalid image');
    const company = await CompanyModel.create({
      name,
      logo,
      targets: JSON.parse(targets),
      techStack,
    });
    delete company._id;
    delete company.__v;
    return response_201(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
}
export async function updateCompany(req, res) {
  const { name, targets, techStack, logo } = req.body;
  if (!name) return response_400(res, 'Invalid request');
  const companyId = req.params.id;
  try {
    if (req.file) {
      await deleteImage(logo);
      const logoUrl = await uploadImage(req.file);
      if (!logoUrl) return response_400(res, 'Invalid image');
      logo = logoUrl;
    }
    const company = await CompanyModel.findByIdAndUpdate(companyId, {
      name,
      targets,
      techStack,
      logo,
    });
    if (!company) return response_400(res, 'Company not found');
    return response_201(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
}
export async function deleteCompany(req, res) {
  const companyId = req.params.id;
  try {
    const company = await CompanyModel.findByIdAndDelete(companyId);
    if (!company) return response_400(res, 'Company not found');
    await deleteImage(company.logo);
    return response_200(res, 'OK');
  } catch (err) {
    response_500(res, err);
  }
}
export async function getStudentsByCompanyStatus(req, res) {
  try {
    const { companyId, status } = req.query;
    if (!companyId || !status) return response_400(res, 'Invalid request');
    const list = await companyUserRelationModel
      .find({ companyId, status })
      .populate('userId')
      .select('userId');
    const users = list.userId;
    return response_200(res, 'OK', users);
  } catch (err) {
    return response_500(res, err);
  }
}
export async function searchByCompanyStatus(req, res) {
  try {
    const { q, companyId, status } = req.query;
    if (!q || !companyId || !status)
      return response_400(res, 'Invalid request');
    const list = companyUserRelationModel.aggregate([
      {
        $populate: {
          path: 'userId',
        },
      },
      {
        $match: {
          $and: [
            { $match: { companyId, status } },
            {
              $or: [
                { 'userId.name': { $regex: new RegExp(q), $options: 'i' } },
                {
                  'userId.rollNumber': { $regex: new RegExp(q), $options: 'i' },
                },
              ],
            },
          ],
        },
      },
    ]);
    const users = list.userId;
    return response_200(res, 'OK', users);
  } catch (err) {
    return response_500(res, err);
  }
}
