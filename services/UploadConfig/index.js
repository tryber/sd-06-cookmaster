const fs = require('fs');
const { promisify } = require('util');
const multer = require('multer');

const asyncDelete = promisify(fs.unlink);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.jpeg`);
  },
  
});
const upload = multer({ storage });
const UploadConfig = {
  
  async deleteImage(req, res, next) {
    const { image } = res.locals;
    if (image) await asyncDelete(image);
    next();
  },

  baseURL: process.env.STATIC_BASE_URL || 'localhost:3000',
  
};

module.exports = { upload, UploadConfig };