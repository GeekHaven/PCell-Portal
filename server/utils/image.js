import cloudinary from '../config/cloudinary.config.js';
import { Readable } from 'stream';

export const uploadImage = async (image) => {
  try {
    const { secure_url } = await bufferUpload(image.buffer);
    return secure_url;
  } catch (err) {
    console.log(err);
    return null;
  }
};
export const deleteImage = async (imageUrl) => {
  try {
    const image = imageUrl.split('/').pop().split('.')[0];
    console.log(image);
    const data = await cloudinary.uploader.destroy(image);
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
const bufferUpload = async (buffer) => {
  return new Promise((resolve, reject) => {
    // create a write stream
    const writeStream = cloudinary.uploader.upload_stream((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
    // create a readstream
    const readStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    // readstream -> writestream
    readStream.pipe(writeStream);
  });
};
