import CompanyModel from '../../models/company.model.js';
import { uploadImage } from '../../utils/image.js';
import {
  response_200,
  response_500,
  response_400,
} from '../../utils/responseCodes.js';

export async function addCompany(req, res) {
  const { name, targets, techStack } = req.body;
  if (!name) return response_400(res, 'Invalid request');
  if (await CompanyModel.exists({ name }))
    return response_400(res, 'Company already exists');
  try {
    const logo = await uploadImage(req.file);
    if (!logo) return response_400(res, 'Invalid image');
    const company = await CompanyModel.create({
      name,
      logo,
      targets,
      techStack,
    });
    delete company._id;
    delete company.__v;
    return response_200(res, 'OK', company);
  } catch (err) {
    return response_500(res, err);
  }
}
