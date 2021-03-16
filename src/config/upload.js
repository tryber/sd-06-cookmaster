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

          let curatedFormat = format;

          if (format === 'jpg') curatedFormat = 'jpeg';

          const fileName = `${recipeId}.${curatedFormat}`;

          return callback(null, fileName);
        },
      }),

      baseURL: process.env.STATIC_BASE_URL || 'localhost:3000/images',
    },
  },
};
