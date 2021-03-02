const multer = require('multer');
const path = require('path');

const uploadsFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tmpFolder = path.resolve(__dirname, '..', '..', 'temp');

module.exports = {
  uploadsFolder,
  tmpFolder,

  config: {
    disk: {
      storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
          const { id: recipeId } = request.params;

          const [, format] = file.originalname.split('.');

          const fileName = `${recipeId}.${format}`;

          return callback(null, fileName);
        },
      }),
    },
  },
};
