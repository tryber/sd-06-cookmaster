const multer = require('multer');
const path = require('path');

const imagesFolder = path.resolve(__dirname, '..', 'images');

const storage = multer.diskStorage({
  destination: imagesFolder,
  filename: (req, _file, callback) => {
    const { id } = req.params;
  
    const fileName = `${id}.jpeg`;
    
    return callback(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload.single('image');