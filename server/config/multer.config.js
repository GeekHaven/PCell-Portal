import multer from 'multer';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb
  },
  fileFilter: fileFilter,
});
