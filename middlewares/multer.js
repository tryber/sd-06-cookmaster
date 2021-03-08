const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {
        const { id } = req.params;
        const { mimetype } = file;
        const formatImg = mimetype.split('/').pop();
        const newFilename = `${id}.${formatImg}`;
        callback(null, newFilename);
    },
});
const upload = multer({ storage });

module.exports = upload;