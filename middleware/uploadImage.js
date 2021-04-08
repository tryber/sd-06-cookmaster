const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, _file, cb) => cb(null, `${req.params.id}.jpeg`),
});
const upload = multer({ storage }).single('image');
module.exports = upload;