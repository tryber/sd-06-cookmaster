const path = require('path');
const multer = require('multer');

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');

module.exports = {
  directory: uploadsFolder,
  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename(req, _file, callback) {
      const { id } = req.params;

      const fileName = `${id}.jpeg`;

      return callback(null, fileName);
    },
  }),
  baseURL: 'localhost:3000/images',
};
