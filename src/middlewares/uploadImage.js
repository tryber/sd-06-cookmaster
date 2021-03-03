const multer = require('multer');
const path = require('path');

const imagesFolder = path.resolve(__dirname, '..', 'images');

const storage = multer.diskStorage({
  destination: imagesFolder,
  filename: (request, _file, callback) => {
    const { id } = request.params;
  
    const fileName = `${id}.jpeg`;
    
    return callback(null, fileName);
  },
})

const upload = multer({ storage });

module.exports = upload.single('image');