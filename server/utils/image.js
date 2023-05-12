import cloudinary from '../config/cloudinary.config.js';
import { response_400 } from './responseCodes.js';
// import upload from '../config/multer.config.js';

export const uploadImage = async (image) => {
  try {
    const { tempFilePath } = image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    return secure_url;
  } catch (err) {
    return response_400(res, err);
  }
};
